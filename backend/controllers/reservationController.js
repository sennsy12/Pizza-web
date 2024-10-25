// controllers/reservationController.js

const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const { sendConfirmationSms } = require('../handlers/twilioHandler');
const moment = require('moment-timezone');
const sequelize = require('../db');

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

    // Store reservation time as UTC
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

    // Convert UTC time to Oslo time for SMS
    const osloTime = moment(utcReservationTime).tz('Europe/Oslo').format('LLL');
    await sendConfirmationSms(phone, newReservation.confirmationNumber, osloTime);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Fetch reservation statistics
async function getReservationStats(req, res) {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        SUM(guests) FILTER (WHERE DATE(created_at) = CURRENT_DATE) AS "guests_today",
        SUM(guests) FILTER (WHERE DATE(created_at) >= DATE_TRUNC('week', CURRENT_DATE)) AS "guests_this_week",
        SUM(guests) FILTER (WHERE DATE(created_at) >= DATE_TRUNC('month', CURRENT_DATE)) AS "guests_this_month",
        SUM(guests) AS "total_guests",
        COUNT(DISTINCT id) FILTER (WHERE DATE(created_at) = CURRENT_DATE) AS "reservations_today",
        COUNT(DISTINCT id) FILTER (WHERE DATE(created_at) >= DATE_TRUNC('week', CURRENT_DATE)) AS "reservations_this_week",
        COUNT(DISTINCT id) FILTER (WHERE DATE(created_at) >= DATE_TRUNC('month', CURRENT_DATE)) AS "reservations_this_month",
        COUNT(DISTINCT id) AS "total_reservations",
        COALESCE(AVG(guests), 0) AS "average_guests_per_reservation"
      FROM reservations;
    `);

    res.json(results[0]);
  } catch (error) {
    console.error('Failed to fetch reservation stats:', error);
    res.status(500).json({ error: 'Failed to fetch reservation stats', details: error.message });
  }
}

module.exports = {
  createReservation,
  getReservationStats
};
