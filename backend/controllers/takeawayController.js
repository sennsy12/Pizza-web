const TakeawayOrder = require('../models/takeawayOrder');
const { v4: uuidv4 } = require('uuid');
const { sendTakeawaySMS } = require('../handlers/twilioHandler');

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
  
  // Validate incoming data (example: check if required fields are present)
  if (!customerName || !customerPhone || !itemsOrdered || !totalAmount || !pickupTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = await TakeawayOrder.create({
      order_number: generateOrderNumber(), // Generate a 6-digit order number
      customer_name: customerName,
      customer_phone: customerPhone,
      items_ordered: JSON.stringify(itemsOrdered),
      total_amount: totalAmount,
      pickup_time: pickupTime
    });

    // Send takeaway SMS
    await sendTakeawaySMS(customerPhone, `Order confirmed! Total: $${totalAmount}. Pickup at: ${pickupTime}`);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating takeaway order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
