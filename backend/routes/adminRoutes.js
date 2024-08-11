const express = require('express');
const { 
  getAllReservations, 
  getAllTakeawayOrders, 
  cancelReservation, 
  cancelTakeawayOrder,
  updateReservation // Add this import
} = require('../controllers/adminController');

const router = express.Router();

// GET all reservations
router.get('/reservations', getAllReservations);

// GET all takeaway orders
router.get('/takeaway-orders', getAllTakeawayOrders);

// DELETE request to cancel a reservation by phone number
router.delete('/reservations/:phoneNumber', cancelReservation);

// DELETE request to cancel a takeaway order by order number and customer phone
router.delete('/takeaway-orders/:orderNumber/:customerPhone', cancelTakeawayOrder);

// PUT request to update a reservation
router.put('/reservations/:id', updateReservation); // Add this route

module.exports = router;
