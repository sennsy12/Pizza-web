const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' // Default role
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Automatically set to current timestamp
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Automatically set to current timestamp
  }
}, {
  tableName: 'users', // Ensure this matches your actual table name
  timestamps: false, // Disable automatic timestamps
});


module.exports = User;
