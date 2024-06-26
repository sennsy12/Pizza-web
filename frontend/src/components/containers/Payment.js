import React from 'react';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Payment = ({ totalPrice }) => (
  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
    <h2 className="mb-4">Payment</h2>
    <p>Total to pay: ${totalPrice}</p>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Card Number</Form.Label>
        <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control type="text" placeholder="MM/YY" required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>CVV</Form.Label>
        <Form.Control type="text" placeholder="123" required />
      </Form.Group>
    </Form>
  </motion.div>
);

export default Payment;
