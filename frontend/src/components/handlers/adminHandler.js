// src/handlers/authHandler.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data.message === 'Login successful';
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/reservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
};

export const fetchTakeawayOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/takeaway-orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching takeaway orders:', error);
    return [];
  }
};
