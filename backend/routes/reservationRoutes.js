const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Create a new reservation
router.post('/', reservationController.createReservation); // Correct route setup

// Route to get reservation stats
router.get('/reservation-stats', reservationController.getReservationStats);

module.exports = router;

