// src/handlers/authHandler.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/auth';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data.message === 'User registered successfully';
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};
