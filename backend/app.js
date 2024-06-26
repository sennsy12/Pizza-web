// src/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db'); // Adjusted path

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const takeawayRoutes = require('./routes/takeawayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/takeaway', takeawayRoutes);
app.use('/api/reservation', reservationRoutes); // Ensure this matches the route setup in reservationRoutes.js

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
