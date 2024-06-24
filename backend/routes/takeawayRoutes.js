const express = require('express');
const router = express.Router();
const takeawayController = require('../controllers/takeawayController');

// Create a new takeaway order
router.post('/takeaway/orders', takeawayController.createTakeawayOrder);

module.exports = router;
