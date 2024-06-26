import React from 'react';
import { Form } from 'react-bootstrap';
import { motion } from 'framer-motion';

const CustomerInfo = ({ customerInfo, handleInfoChange }) => (
  <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
    <h2 className="mb-4">Your Information</h2>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleInfoChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={customerInfo.phone}
          onChange={handleInfoChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pickup Date</Form.Label>
        <Form.Control 
          type="date" 
          name="pickupDate" 
          value={customerInfo.pickupDate} 
          onChange={handleInfoChange} 
          required 
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pickup Time</Form.Label>
        <Form.Control 
          type="time" 
          name="pickupTime" 
          value={customerInfo.pickupTime} 
          onChange={handleInfoChange} 
          required 
        />
      </Form.Group>
    </Form>
  </motion.div>
);

export default CustomerInfo;
