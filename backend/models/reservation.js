const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Customer = require('./customer');

const Reservation = sequelize.define('reservation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        field: 'order_number'
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer,
            key: 'id'
        },
        field: 'customer_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        // Remove unique constraint
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reservationTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'reservation_time'
    },
    confirmationNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'confirmation_number'
    },
    confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'confirmed_at'
    },
    cancelled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    cancellationReason: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'cancellation_reason'
    },
    smsConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'sms_confirmed'
    },
    smsReminder: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'sms_reminder'
    },
}, {
    tableName: 'reservations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Reservation.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Reservation;
