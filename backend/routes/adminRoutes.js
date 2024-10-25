const express = require('express');
const { 
  getAllReservations, 
  getAllTakeawayOrders, 
  cancelReservation, 
  cancelTakeawayOrder,
  updateReservation 
} = require('../controllers/adminController'); // Ensure this path is correct

const { authenticateUser } = require('../middleware/authMiddleware'); // Import your authentication middleware

const router = express.Router();

// GET all reservations
router.get('/reservations', authenticateUser, getAllReservations); // Protect this route

// GET all takeaway orders
router.get('/takeaway-orders', authenticateUser, getAllTakeawayOrders); // Protect this route

// DELETE request to cancel a reservation by confirmation number
router.delete('/reservations/:confirmationNumber', authenticateUser, cancelReservation);


// DELETE request to cancel a takeaway order by order number and customer phone
router.delete('/takeaway-orders/:orderNumber/:customerPhone', authenticateUser, cancelTakeawayOrder); // Protect this route

// PUT request to update a reservation
router.put('/reservations/:id', authenticateUser, updateReservation); // Protect this route

module.exports = router;
