// controllers/adminController.js

const Reservation = require('../models/reservation');
const TakeawayOrder = require('../models/takeawayOrder');

// Get all reservations
async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get all takeaway orders
async function getAllTakeawayOrders(req, res) {
  try {
    const orders = await TakeawayOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching takeaway orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update reservation details
async function updateReservation(req, res) {
  try {
    const { id } = req.params; 
    const updates = req.body;

    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.update(updates);

    res.status(200).json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'An error occurred while updating the reservation' });
  }
}

async function cancelReservation(req, res) {
  const { confirmationNumber } = req.params;

  try {
    const reservation = await Reservation.findOne({ where: { confirmationNumber } });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.destroy(); // Delete the reservation from the database

    res.status(200).json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Cancel a takeaway order by order number and customer phone
async function cancelTakeawayOrder(req, res) {
  try {
    const { orderNumber, customerPhone } = req.params;

    const takeawayOrder = await TakeawayOrder.findOne({
      where: {
        order_number: orderNumber,
        customer_phone: customerPhone
      }
    });

    if (!takeawayOrder) {
      return res.status(404).json({ message: 'Takeaway order not found' });
    }

    await takeawayOrder.destroy();

    res.status(200).json({ message: 'Takeaway order and related entries deleted successfully' });
  } catch (error) {
    console.error('Error deleting takeaway order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the takeaway order' });
  }
}

module.exports = {
  getAllReservations,
  getAllTakeawayOrders,
  updateReservation,
  cancelReservation,
  cancelTakeawayOrder
};
