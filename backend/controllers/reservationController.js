// controllers/reservationController.js

const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const { sendConfirmationSms } = require('../handlers/twilioHandler');
const moment = require('moment-timezone');
const sequelize = require('../db');
const { Op } = require('sequelize');
// Generate a random alphanumeric confirmation number
function generateConfirmationNumber() {
  const length = 6; 
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Get or create a customer by phone number
async function getOrCreateCustomerByPhone(phone, name, lastName, email) {
  try {
    let customer = await Customer.findOne({ where: { phone } });
    if (!customer) {
      customer = await Customer.create({ phone, name, lastName, email });
    }
    return customer;
  } catch (error) {
    throw new Error('Error fetching or creating customer');
  }
}

// Create a new reservation
async function createReservation(req, res) {
  const { name, lastName, email, phone, guests, reservationTime } = req.body;

  if (!name || !lastName || !email || !phone || !guests || !reservationTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const customer = await getOrCreateCustomerByPhone(phone, name, lastName, email);

    
    const utcReservationTime = moment.utc(reservationTime).toDate();

    const newReservation = await Reservation.create({
      customerId: customer.id,
      name,
      lastName,
      email,
      phone,
      guests,
      reservationTime: utcReservationTime,
      confirmationNumber: generateConfirmationNumber(),
    });

    
    const osloTime = moment(utcReservationTime).tz('Europe/Oslo').format('LLL');
    await sendConfirmationSms(phone, newReservation.confirmationNumber, osloTime);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getReservationStats(req, res) {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        SUM(COALESCE(guests, 0)) AS "total_guests",
        COUNT(DISTINCT id) AS "total_reservations",
        COALESCE(AVG(guests), 0) AS "average_guests_per_reservation",
        MAX(guests) AS "peak_guests_per_reservation",
        (SELECT MAX(created_at) FROM reservations WHERE DATE(created_at) = CURRENT_DATE) AS "latest_reservation_today",
        SUM(CASE WHEN DATE(created_at) = CURRENT_DATE THEN guests ELSE 0 END) AS "guests_today",
        COUNT(DISTINCT CASE WHEN DATE(created_at) = CURRENT_DATE THEN id END) AS "reservations_today",
        SUM(CASE WHEN DATE(created_at) >= DATE_TRUNC('week', CURRENT_DATE) THEN guests ELSE 0 END) AS "guests_this_week",
        COUNT(DISTINCT CASE WHEN DATE(created_at) >= DATE_TRUNC('week', CURRENT_DATE) THEN id END) AS "reservations_this_week",
        SUM(CASE WHEN DATE(created_at) >= DATE_TRUNC('month', CURRENT_DATE) THEN guests ELSE 0 END) AS "guests_this_month",
        COUNT(DISTINCT CASE WHEN DATE(created_at) >= DATE_TRUNC('month', CURRENT_DATE) THEN id END) AS "reservations_this_month"
      FROM reservations;
    `);

 
    if (results[0].latest_reservation_today) {
      results[0].latest_reservation_today = new Date(results[0].latest_reservation_today).toISOString(); 
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Failed to fetch reservation stats:', error);
    res.status(500).json({ error: 'Failed to fetch reservation stats', details: error.message });
  }
}

async function getAdvancedReservationStats(req, res) {
  try {
    const { startDate, endDate, guests, phone, viewType } = req.query;

    if (!startDate || !endDate || !viewType) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    let query = `
      SELECT 
        DATE("reservation_time") AS date,
    `;

    if (viewType === 'guests') {
      query += `SUM("guests") AS total`;
    } else if (viewType === 'reservations') {
      query += `COUNT(*) AS total`;
    } else {
      return res.status(400).json({ error: 'Invalid view type' });
    }

    query += `
      FROM 
        "reservations"
      WHERE 
        "reservation_time" BETWEEN :startDate AND :endDate
    `;

    const queryParams = { startDate, endDate };

    if (guests) {
      query += ` AND "guests" >= :guests`;
      queryParams.guests = parseInt(guests, 10);
    }

    if (phone) {
      query += ` AND "phone" = :phone`;
      queryParams.phone = phone;
    }

    query += `
      GROUP BY DATE("reservation_time")
      ORDER BY DATE("reservation_time") ASC
    `;


    const results = await sequelize.query(query, {
      replacements: queryParams,
      type: sequelize.QueryTypes.SELECT
    });

    console.log('Query results:', results);

    res.json(results);
  } catch (error) {
    console.error('Error fetching reservation stats:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}




module.exports = {
  createReservation,
  getAdvancedReservationStats,
  getReservationStats
};
