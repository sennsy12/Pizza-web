// profileRoutes.js

const express = require('express');
const { getUserProfile } = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user profile information
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;
