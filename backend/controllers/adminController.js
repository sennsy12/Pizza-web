const Reservation = require('../models/reservation');
const TakeawayOrder = require('../models/takeawayOrder');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllTakeawayOrders = async (req, res) => {
  try {
    const orders = await TakeawayOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching takeaway orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update reservation details
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params; // Get the reservation ID from the URL
    const updates = req.body; // Get the update data from the request body

    // Find reservation by ID
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update reservation details
    await reservation.update(updates);

    res.status(200).json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'An error occurred while updating the reservation' });
  }
};


// Function to cancel a reservation by phone number
exports.cancelReservation = async (req, res) => {
  const { phoneNumber } = req.params;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const result = await Reservation.destroy({ where: { phone: phoneNumber } });

    if (result) {
      res.status(200).json({ message: 'Reservation cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Function to cancel a takeaway order by order number and customer phone
exports.cancelTakeawayOrder = async (req, res) => {
  try {
    const { orderNumber, customerPhone } = req.params;

    // Find takeaway order based on orderNumber and customerPhone
    const takeawayOrder = await TakeawayOrder.findOne({
      where: {
        order_number: orderNumber,
        customer_phone: customerPhone
      }
    });

    if (!takeawayOrder) {
      return res.status(404).json({ message: 'Takeaway order not found' });
    }

    // Delete the takeaway order
    await takeawayOrder.destroy();

    res.status(200).json({ message: 'Takeaway order and related entries deleted successfully' });
  } catch (error) {
    console.error('Error deleting takeaway order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the takeaway order' });
  }
};
