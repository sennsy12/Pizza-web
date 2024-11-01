import axios from 'axios';

// API URLs for menu routes
const API_URL_MENU = 'http://localhost:5001/api/menu'; // For non-protected routes
const API_URL_ADMIN = 'http://localhost:5001/api'; // For protected routes requiring token

// Get all menu items (no token required)
export const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${API_URL_MENU}/all`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

// Get a single menu item by ID (no token required)
export const fetchMenuItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_MENU}/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching menu item by ID:', error);
    throw error;
  }
};

// Get all menu items (admin only, requires token)
export const fetchAdminMenuItems = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`${API_URL_ADMIN}/admin/menu`, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin menu items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Create a new menu item (requires token)
export const createMenuItem = async (menuItem) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.post(`${API_URL_ADMIN}/admin/menu`, menuItem, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating menu item:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update a menu item by ID (requires token)
export const updateMenuItem = async (id, updatedItem) => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(`${API_URL_ADMIN}/admin/menu/${id}`, updatedItem, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating menu item:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Delete a menu item by ID (requires token)
export const deleteMenuItem = async (id) => {
  try {
    const token = localStorage.getItem('token'); 
    await axios.delete(`${API_URL_ADMIN}/admin/menu/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  } catch (error) {
    console.error('Error deleting menu item:', error.response ? error.response.data : error.message);
    throw error;
  }
};
