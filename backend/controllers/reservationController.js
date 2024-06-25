const Reservation = require('../models/reservation');
const { sendConfirmationSms } = require('../handlers/twilioHandler');
const crypto = require('crypto');
const moment = require('moment'); // Import Moment.js

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

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { name, lastName, email, phone, guests, reservationTime } = req.body;

  // Validate incoming data (example: check if required fields are present)
  if (!name || !lastName || !email || !phone || !guests || !reservationTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Convert reservationTime to UTC before saving
  const utcReservationTime = moment.utc(reservationTime).toISOString();

  // Generate confirmation number
  const confirmationNumber = generateConfirmationNumber(); // Generate a custom alphanumeric string

  try {
    const newReservation = await Reservation.create({
      name,
      lastName, // Include lastName
      email,
      phone,
      guests,
      reservationTime: utcReservationTime, // Save in UTC format
      confirmationNumber, // Include confirmation number in the create method
    });

    // Send confirmation SMS
    await sendConfirmationSms(phone, confirmationNumber, moment.utc(reservationTime).format('LLL')); // Format time in SMS

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
