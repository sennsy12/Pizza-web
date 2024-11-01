const express = require('express');
const { 
  getAllReservations, 
  getAllTakeawayOrders, 
  cancelReservation, 
  cancelTakeawayOrder,
  updateReservation 
} = require('../controllers/adminController'); 

const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController'); 

const { authenticateUser } = require('../middleware/authMiddleware'); 

const router = express.Router();

// Admin Routes

// Reservations
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

// Menu Management Routes
// GET all menu items
router.get('/menu', authenticateUser, getMenuItems); // Protect this route

// GET a menu item by ID
router.get('/menu/:id', authenticateUser, getMenuItemById); // Protect this route

// POST a new menu item
router.post('/menu', authenticateUser, createMenuItem); // Protect this route

// PUT to update a menu item by ID
router.put('/menu/:id', authenticateUser, updateMenuItem); // Protect this route

// DELETE a menu item by ID
router.delete('/menu/:id', authenticateUser, deleteMenuItem); // Protect this route

module.exports = router;
