const express = require('express');
const { getAllReservations, getAllTakeawayOrders, cancelReservation, cancelTakeawayOrder } = require('../controllers/adminController');
const router = express.Router();



router.get('/reservations', getAllReservations);
router.get('/takeaway-orders', getAllTakeawayOrders);
router.post('/cancel-reservation', cancelReservation);
router.post('/cancel-takeaway-order', cancelTakeawayOrder);

module.exports = router;
