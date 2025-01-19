// profileHandler.js
import axios from 'axios';

export const fetchProfileData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    const response = await axios.get('http://localhost:5001/api/profile/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Destructure and format the response data
    const { customer, recent_activity } = response.data;
    
    return {
      customer: {
        id: customer.id,
        name: customer.name,
        lastName: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        createdAt: customer.created_at,
        tier: customer.customer_tier,
        statistics: {
          totalReservations: customer.total_reservations,
          totalTakeawayOrders: customer.total_takeaway_orders,
          totalSpent: parseFloat(customer.stats.total_spent).toFixed(2),
          averagePartySize: Math.round(customer.stats.average_party_size * 10) / 10,
          upcomingReservations: customer.stats.upcoming_reservations,
          favoriteOrderTime: customer.stats.favorite_order_time
        }
      },
      reservations: recent_activity.reservations.map(reservation => ({
        ...reservation,
        reservationTime: new Date(reservation.reservation_time),
        createdAt: new Date(reservation.created_at)
      })),
      takeawayOrders: recent_activity.takeaway_orders.map(order => ({
        ...order,
        pickupTime: new Date(order.pickup_time),
        createdAt: new Date(order.created_at),
        totalAmount: parseFloat(order.total_amount).toFixed(2)
      }))
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Profile not found');
    }
    throw new Error('Error fetching profile data');
  }
};
