// src/routes/takeawayRoutes.js
const express = require('express');
const router = express.Router();
const takeawayController = require('../controllers/takeawayController');

// Create a new takeaway order
router.post('/create', takeawayController.createTakeawayOrder);

module.exports = router;
