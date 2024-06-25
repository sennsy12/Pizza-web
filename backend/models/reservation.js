const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the path as necessary

const Reservation = sequelize.define('reservation', {
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'order_number' // Use snake_case column name in PostgreSQL
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name' // Use snake_case column name in PostgreSQL
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness constraint
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure uniqueness constraint
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservationTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'reservation_time' // Use snake_case column name in PostgreSQL
  },
  confirmationNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'confirmation_number' // Use snake_case column name in PostgreSQL
  },
  confirmedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'confirmed_at' // Use snake_case column name in PostgreSQL
  },
  cancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'cancellation_reason' // Use snake_case column name in PostgreSQL
  },
  smsConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'sms_confirmed' // Use snake_case column name in PostgreSQL
  },
  smsReminder: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'sms_reminder' // Use snake_case column name in PostgreSQL
  },
}, {
  tableName: 'reservations', // Ensure the correct table name in lowercase
  timestamps: true, // Enable timestamps
  createdAt: 'created_at', // Map this attribute to the correct column in the database
  updatedAt: false // Disable updatedAt
});

module.exports = Reservation;
