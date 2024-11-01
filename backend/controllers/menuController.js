// controllers/menuController.js
const MenuItem = require('../models/menu'); 
const { Op } = require('sequelize');

// GET: Retrieve all menu items
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET: Retrieve a single menu item by ID
const getMenuItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(`Error retrieving menu item with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST: Create a new menu item
const createMenuItem = async (req, res) => {
  const { name, description, img, price, category } = req.body;

  // Basic validation
  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Name, description, price, and category are required' });
  }

  try {
    const newItem = await MenuItem.create({
      name,
      description,
      img: img || 'https://via.placeholder.com/150', 
      price,
      category,
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT: Update an existing menu item by ID
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, img, price, category } = req.body;

  try {
    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update fields if they are provided in the request body
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (img !== undefined) item.img = img;
    if (price !== undefined) item.price = price;
    if (category !== undefined) item.category = category;

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    console.error(`Error updating menu item with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE: Remove a menu item by ID
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await item.destroy();
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting menu item with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
