const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db');
const authRoutes = require('./routes/authRoutes');
const takeawayRoutes = require('./routes/takeawayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { authenticateUser, authorizeAdmin } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
app.use('/api/auth', authRoutes);

// Login route
app.post('/api/login', authenticateUser);

// Protect admin routes
app.use('/api/admin', authorizeAdmin, adminRoutes);

// Other routes
app.use('/api/takeaway', takeawayRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/profile', profileRoutes);

// Test the database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  testDatabaseConnection();
});
