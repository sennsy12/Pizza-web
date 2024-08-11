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
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default createReservation;
