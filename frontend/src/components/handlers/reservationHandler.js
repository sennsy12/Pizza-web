import axios from 'axios';

// Function to create a reservation
const createReservation = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5001/api/reservation', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch reservation statistics
export const fetchReservationStats = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/reservation/reservation-stats');

    // Format data for frontend use if needed
    const stats = response.data;

    // Organize data for easier use in cards and charts
    const formattedStats = {
      guestsToday: stats.guests_today,
      reservationsToday: stats.reservations_today,
      hourlyToday: stats.hourly_today || [],
      guestsThisWeek: stats.guests_this_week,
      reservationsThisWeek: stats.reservations_this_week,
      guestsThisMonth: stats.guests_this_month,
      reservationsThisMonth: stats.reservations_this_month,
      peakGuestsPerReservation: stats.peak_guests_per_reservation,
      latestReservationToday: stats.latest_reservation_today,
      averageGuestsPerReservation: stats.average_guests_per_reservation,
      totalGuests: stats.total_guests,
      totalReservations: stats.total_reservations,
    };

    return formattedStats;
  } catch (error) {
    console.error('Fetch error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export default createReservation;
