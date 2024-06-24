const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Create a new reservation
router.post('/reservations', reservationController.createReservation);

module.exports = router;
