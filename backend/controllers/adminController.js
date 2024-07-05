const Reservation = require('../models/reservation');
const TakeawayOrder = require('../models/takeawayOrder');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllTakeawayOrders = async (req, res) => {
  try {
    const orders = await TakeawayOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching takeaway orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.cancelReservation = async (req, res) => {
  // Implementation
};

exports.cancelTakeawayOrder = async (req, res) => {
  // Implementation
};
