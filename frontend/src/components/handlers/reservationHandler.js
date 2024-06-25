// src/handlers/reservationHandler.js

const createReservation = async (formData) => {
    try {
      const response = await fetch('http://localhost:5001/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  };
  
  export default createReservation;
  