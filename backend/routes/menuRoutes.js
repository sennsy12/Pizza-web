// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
} = require('../controllers/menuController');


// GET /api/menu/all - Retrieve all menu items
router.get('/all', getMenuItems);

// GET /api/menu/:id - Retrieve a single menu item by ID
router.get('/:id', getMenuItemById);


module.exports = router;
