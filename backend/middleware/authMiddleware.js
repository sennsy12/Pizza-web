// authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs'); // Updated to use bcryptjs

// Middleware to authenticate a user based on the token provided in the Authorization header
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token received:', token); // Log the token
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err); // Log the error
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    console.log('Decoded user info:', req.user); // Log decoded user info
    next();
  });
};


const authorizeAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    req.user = decoded;
    next();
  });
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
