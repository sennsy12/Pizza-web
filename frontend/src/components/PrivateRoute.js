// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  return token ? children : <Navigate to="/login" replace />; // If no token, redirect to login
};

export default PrivateRoute;
