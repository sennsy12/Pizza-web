import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  // To force a re-render on login/logout by listening to changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowed roles for the route
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;  // Redirect to home or another page if role is not allowed
  }

  return children;
};

export default PrivateRoute;
