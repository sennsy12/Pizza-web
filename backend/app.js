const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db');
const { authenticateUser } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

// Login route
app.post('/api/login', authenticateUser, (req, res) => {
  res.json({ message: 'Login successful', role: req.user.role });
});

// Routes
const takeawayRoutes = require('./routes/takeawayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.use('/api/takeaway', takeawayRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/admin', adminRoutes);

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
