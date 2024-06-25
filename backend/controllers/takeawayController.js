const Takeaway = require('../models/takeaway');

// Create a new takeaway order
exports.createTakeawayOrder = async (req, res) => {
  const { productName, quantity, deliveryTime, totalPrice, phone } = req.body;
  try {
    const newOrder = await Takeaway.create({
      productName,
      quantity,
      deliveryTime,
      totalPrice,
    });

    // Send takeaway SMS
    await sendTakeawaySMS(phone, `Product: ${productName}, Quantity: ${quantity}, Total Price: ${totalPrice}`);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating takeaway order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
