const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TakeawayOrder = sequelize.define('TakeawayOrder', {
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemsOrdered: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
});

module.exports = TakeawayOrder;
