// controllers/takeawayController.js

const TakeawayOrder = require('../models/takeawayOrder');
const { v4: uuidv4 } = require('uuid');
const { sendTakeawaySMS } = require('../handlers/twilioHandler');
const moment = require('moment-timezone');

// Generate a 6-digit alphanumeric order number
function generateOrderNumber() {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a new takeaway order
async function createTakeawayOrder(req, res) {
  const { customerName, customerPhone, itemsOrdered, totalAmount, pickupTime } = req.body;

  if (!customerName || !customerPhone || !itemsOrdered || !totalAmount || !pickupTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const utcPickupTime = moment.tz(pickupTime, 'Europe/Oslo').utc().toDate();

    const newOrder = await TakeawayOrder.create({
      order_number: generateOrderNumber(),
      customer_name: customerName,
      customer_phone: customerPhone,
      items_ordered: JSON.stringify(itemsOrdered),
      total_amount: totalAmount,
      pickup_time: utcPickupTime,
    });

    const localPickupTime = moment(utcPickupTime).tz('Europe/Oslo').format('LLL');

    await sendTakeawaySMS(
      customerPhone,
      `Thank you ${customerName}, your order is confirmed! Total: $${totalAmount}. Pickup at: ${localPickupTime}`
    );

    const localCreatedAt = moment(newOrder.created_at).tz('Europe/Oslo').format('YYYY-MM-DD HH:mm:ss');


    res.status(201).json({
      ...newOrder.toJSON(),
      created_at: localCreatedAt,
    });
  } catch (error) {
    console.error('Error creating takeaway order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createTakeawayOrder,
};
