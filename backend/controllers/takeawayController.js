// takeawaycontroller.js

const TakeawayOrder = require('../models/takeawayOrder');
const { v4: uuidv4 } = require('uuid');
const { sendTakeawaySMS } = require('../handlers/twilioHandler');
const moment = require('moment-timezone');
// Function to generate a 6-digit alphanumeric string
const generateOrderNumber = () => {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

exports.createTakeawayOrder = async (req, res) => {
  const { customerName, customerPhone, itemsOrdered, totalAmount, pickupTime } = req.body;
  
  if (!customerName || !customerPhone || !itemsOrdered || !totalAmount || !pickupTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Ensure the pickup time is in UTC
    const utcPickupTime = moment.tz(pickupTime, 'Europe/Oslo').utc().toDate();

    const newOrder = await TakeawayOrder.create({
      order_number: generateOrderNumber(),
      customer_name: customerName,
      customer_phone: customerPhone,
      items_ordered: JSON.stringify(itemsOrdered),
      total_amount: totalAmount,
      pickup_time: utcPickupTime
    });

    // Convert UTC time to local time for SMS
    const localPickupTime = moment(utcPickupTime).tz('Europe/Oslo').format('LLL');

    await sendTakeawaySMS(customerPhone, `Thank you ${customerName} your Order is confirmed! Total: $${totalAmount}. Pickup at: ${localPickupTime}`);

    // Convert created_at to local time for response
    const localCreatedAt = moment(newOrder.created_at).tz('Europe/Oslo').format('YYYY-MM-DD HH:mm:ss');

    // Respond with the order details, including the local created_at
    res.status(201).json({
      ...newOrder.toJSON(),
      created_at: localCreatedAt
    });
  } catch (error) {
    console.error('Error creating takeaway order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};