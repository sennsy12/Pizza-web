// src/handlers/takeawayHandler.js
import axios from 'axios';

export const createTakeawayOrder = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:5001/api/takeaway/create', orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
