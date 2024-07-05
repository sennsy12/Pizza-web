const TakeawayOrder = require('../models/takeawayOrder');
const { v4: uuidv4 } = require('uuid');
const { sendTakeawaySMS } = require('../handlers/twilioHandler');
const moment = require('moment');
// Function to generate a 6-digit alphanumeric string
const generateOrderNumber = () => {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create a new takeaway order
exports.createTakeawayOrder = async (req, res) => {
  const { customerName, customerPhone, itemsOrdered, totalAmount, pickupTime } = req.body;
  
  // Validate incoming data
  if (!customerName || !customerPhone || !itemsOrdered || !totalAmount || !pickupTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const utcPickupTime = moment.utc(pickupTime).toISOString();
    const localPickupTime = moment.utc(pickupTime).local().format('LLL');

    const newOrder = await TakeawayOrder.create({
      order_number: generateOrderNumber(),
      customer_name: customerName,
      customer_phone: customerPhone,
      items_ordered: JSON.stringify(itemsOrdered),
      total_amount: totalAmount,
      pickup_time: utcPickupTime
    });

    // Send takeaway SMS
    await sendTakeawaySMS(customerPhone, `Thank you ${customerName} your Order is confirmed! Total: $${totalAmount}. Pickup at: ${localPickupTime}`);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating takeaway order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
