const Reservation = require('../models/reservation');
const { sendReservationSMS } = require('../services/smsService');

// Create a new reservation
exports.createReservation = async (req, res) => {
  const { name, email, phone, guests, reservationTime } = req.body;
  try {
    const newReservation = await Reservation.create({
      name,
      email,
      phone,
      guests,
      reservationTime,
    });

    // Send reservation SMS
    await sendReservationSMS(phone, newReservation.id);

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
