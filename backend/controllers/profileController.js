// controllers/profileController.js
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');

async function getUserProfile(req, res) {
    const userId = req.user.id;

    try {
        // Get customer information with stats
        const customerQuery = `
    SELECT 
    c.id,
    c.name,
    c.last_name,
    c.email,
    c.phone,
    c.created_at,
    COUNT(DISTINCT r.id) as total_reservations,
    COUNT(DISTINCT t.id) as total_takeaway_orders,
    COALESCE(SUM(t.total_amount), 0) as total_spent,
    COALESCE(AVG(r.guests), 0) as average_party_size  -- Calculate average guests per reservation
FROM customers c
LEFT JOIN reservations r ON c.id = r.customer_id
LEFT JOIN takeaway_orders t ON c.phone = t.customer_phone
WHERE c.user_id = :userId
GROUP BY c.id, c.name, c.last_name, c.email, c.phone, c.created_at;
`;


        const customerResult = await sequelize.query(customerQuery, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });

        if (!customerResult.length) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        const customer = customerResult[0];

        // Get recent reservations
        const reservationsQuery = `
            SELECT 
                id,
                order_number,
                name,
                last_name,
                email,
                phone,
                guests,
                reservation_time,
                confirmation_number,
                sms_confirmed,
                sms_reminder,
                created_at
            FROM reservations 
            WHERE customer_id = :customerId
            ORDER BY reservation_time DESC
            LIMIT 10
        `;

        // Get recent takeaway orders
        const takeawayOrdersQuery = `
            SELECT 
                id,
                order_number,
                customer_name,
                customer_phone,
                items_ordered,
                total_amount,
                pickup_time,
                created_at,
                quantity
            FROM takeaway_orders 
            WHERE customer_phone = :customerPhone
            ORDER BY created_at DESC
            LIMIT 10
        `;

        const upcomingReservationsQuery = `
        SELECT 
            COUNT(*) as upcoming_reservations
        FROM reservations
        WHERE customer_id = :customerId AND reservation_time > NOW()
    `;
    
    const upcomingReservationsResult = await sequelize.query(upcomingReservationsQuery, {
        replacements: { customerId: customer.id },
        type: QueryTypes.SELECT
    });
    
    const upcomingReservations = upcomingReservationsResult[0].upcoming_reservations;
    

        const [reservations, takeawayOrders] = await Promise.all([
            sequelize.query(reservationsQuery, {
                replacements: { customerId: customer.id },
                type: QueryTypes.SELECT
            }),
            sequelize.query(takeawayOrdersQuery, {
                replacements: { customerPhone: customer.phone },
                type: QueryTypes.SELECT
            })
        ]);

        // Calculate customer tier
        const customerTier = parseFloat(customer.total_spent) > 1000 ? 'VIP' : 
                           parseFloat(customer.total_spent) > 500 ? 'Regular' : 'New';

                           res.json({
                            customer: {
                                ...customer,
                                customer_tier: customerTier,
                                stats: {
                                    total_reservations: parseInt(customer.total_reservations),
                                    total_takeaway_orders: parseInt(customer.total_takeaway_orders),
                                    total_spent: parseFloat(customer.total_spent),
                                    average_party_size: parseFloat(customer.average_party_size),
                                    upcoming_reservations: upcomingReservations
                                }
                            },
                            recent_activity: {
                                reservations,
                                takeaway_orders: takeawayOrders
                            }
                        });
                        

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUserProfile
};
