const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');  // Import Sequelize instance from db

const Reservation = sequelize.define('Reservation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reservationTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Reservation;
