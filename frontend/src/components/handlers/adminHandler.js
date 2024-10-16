// src/handlers/adminHandler.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';



export const fetchReservations = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const response = await axios.get(`${API_BASE_URL}/admin/reservations`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });
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

// Function to update a reservation
export const updateReservation = async (id, reservationData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/reservations/${id}`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to delete a reservation
export const deleteReservation = async ( phoneNumber) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/reservations/${phoneNumber}`);
    return response.data.message === 'Reservation cancelled successfully';
  } catch (error) {
    console.error('Error deleting reservation:', error.response ? error.response.data : error.message);
    return false;
  }
};

// Function to delete a takeaway order
export const deleteTakeawayOrder = async (orderNumber, customerPhone) => {
  try {
    // Updated URL to match backend DELETE route
    const response = await axios.delete(`${API_BASE_URL}/admin/takeaway-orders/${orderNumber}/${customerPhone}`);
    return response.data.message === 'Takeaway order and related entries deleted successfully';
  } catch (error) {
    console.error('Error deleting takeaway order:', error.response ? error.response.data : error.message);
    return false;
  }
};
