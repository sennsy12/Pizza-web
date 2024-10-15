// authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
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
