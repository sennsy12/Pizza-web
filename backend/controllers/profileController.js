// controllers/profileController.js

const Customer = require('../models/customer');
const TakeawayOrder = require('../models/takeawayOrder');
const Reservation = require('../models/reservation');

// Get user profile
async function getUserProfile(req, res) {
    const userId = req.user.id;

    try {
        const customerInfo = await Customer.findOne({
            where: {
                user_id: userId, 
            },
            attributes: ['id', 'name', 'last_name', 'email', 'phone', 'created_at'],
        });

        if (!customerInfo) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        const reservations = await Reservation.findAll({
            where: { customer_id: customerInfo.id }, 
        });

        const takeawayOrders = await TakeawayOrder.findAll({
            where: { customer_id: customerInfo.id },
        });

        res.json({
            customer: customerInfo,
            reservations,
            takeawayOrders,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserProfile
};
