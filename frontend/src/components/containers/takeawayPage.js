// src/components/TakeawayPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { createTakeawayOrder } from '../handlers/takeawayHandler'; // Adjust the import path as needed

const StyledCard = styled(motion.div)`
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MenuImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Step = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#ff6b6b' : '#ddd'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const TakeawayPage = () => {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    pickupTime: '',
  });

  const menu = [
    { id: 1, name: 'Margherita', price: 10, image: 'https://images.unsplash.com/photo-1601924582971-4b1e6f8f7d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1hcmdoZXJpdGF8ZW58MHx8fHwxNjE2NzY2NzY0&ixlib=rb-1.2.1&q=80&w=400' },
    { id: 2, name: 'Pepperoni', price: 12, image: 'https://images.unsplash.com/photo-1601924582971-4b1e6f8f7d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBlcHBlcm9uaXxlbnwwfHx8fDE2MTY3NjY3NjQ&ixlib=rb-1.2.1&q=80&w=400' },
    { id: 3, name: 'Vegetarian', price: 11, image: 'https://images.unsplash.com/photo-1601924582971-4b1e6f8f7d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHZlZ2V0YXJpYW58ZW58MHx8fHwxNjE2NzY2NzY0&ixlib=rb-1.2.1&q=80&w=400' },
    { id: 4, name: 'Hawaiian', price: 13, image: 'https://images.unsplash.com/photo-1601924582971-4b1e6f8f7d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhhd2FpaWFufGVufDB8fHx8MTYxNjc2Njc2NA&ixlib=rb-1.2.1&q=80&w=400' },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      // Ensure pickupTime is in a valid format (YYYY-MM-DDTHH:mm)
      const pickupDateTime = new Date(`${customerInfo.pickupDate}T${customerInfo.pickupTime}`);
      
      if (isNaN(pickupDateTime.getTime())) {
        throw new Error('Invalid pickup date/time');
      }
  
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        itemsOrdered: cart.map(item => ({ id: item.id, name: item.name, price: item.price })),
        totalAmount: totalPrice,
        pickupTime: pickupDateTime.toISOString(),
      };
      
      await createTakeawayOrder(orderData);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };
  
  
  
  
  
  
  
  
  

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2 className="mb-4">Select Your Pizzas</h2>
            <Row>
              {menu.map((item) => (
                <Col md={6} key={item.id}>
                  <StyledCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card>
                      <MenuImage src={item.image} alt={item.name} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>${item.price}</Card.Text>
                        <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </StyledCard>
                </Col>
              ))}
            </Row>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
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
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
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
      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <StepIndicator>
        <Step active={step >= 1}>1</Step>
        <Step active={step >= 2}>2</Step>
        <Step active={step >= 3}>3</Step>
      </StepIndicator>
      
      <Row>
        <Col md={8}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </Col>
        <Col md={4}>
          <StyledCard>
            <Card>
              <Card.Body>
                <Card.Title>Your Order</Card.Title>
                <ListGroup variant="flush">
                  {cart.map((item, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      {item.name}
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>Remove</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="mt-3">
                  <strong>Total: ${totalPrice}</strong>
                </div>
              </Card.Body>
            </Card>
          </StyledCard>
          <div className="d-flex justify-content-between">
            {step > 1 && (
              <Button variant="secondary" onClick={prevStep}>Previous</Button>
            )}
            {step < 3 ? (
              <Button variant="primary" onClick={nextStep} disabled={cart.length === 0}>Next</Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>Place Order</Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TakeawayPage;
