const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TakeawayOrder = sequelize.define('TakeawayOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  order_number: {
    type: DataTypes.STRING(20),
    unique: true
  },
  customer_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  customer_phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  items_ordered: {
    type: DataTypes.TEXT
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  pickup_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmed_at: {
    type: DataTypes.DATE
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'takeaway_orders',
  timestamps: false
});

module.exports = TakeawayOrder;
