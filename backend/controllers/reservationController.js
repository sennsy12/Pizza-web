const Reservation = require('../models/reservation');
const Customer = require('../models/customer');
const { sendConfirmationSms } = require('../handlers/twilioHandler');
const moment = require('moment-timezone');

// Function to generate a random alphanumeric string
const generateConfirmationNumber = () => {
  const length = 6; // Length of the confirmation number
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Function to get or create a customer by phone number
const getOrCreateCustomerByPhone = async (phone, name, lastName, email) => {
  try {
    let customer = await Customer.findOne({ where: { phone } });
    if (!customer) {
      customer = await Customer.create({ phone, name, lastName, email });
    }
    return customer;
  } catch (error) {
    throw new Error('Error fetching or creating customer');
  }
};

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { name, lastName, email, phone, guests, reservationTime } = req.body;

  if (!name || !lastName || !email || !phone || !guests || !reservationTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const customer = await getOrCreateCustomerByPhone(phone, name, lastName, email);

    // Store the reservation time as UTC in the database
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
};

