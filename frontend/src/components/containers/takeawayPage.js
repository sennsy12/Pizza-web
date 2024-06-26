import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import { createTakeawayOrder } from '../handlers/takeawayHandler';
import MenuSelection from './MenuSelection';
import CustomerInfo from './CustomerInfo';
import Payment from './Payment';
import OrderSummary from './OrderSummary';

const TakeawayPage = () => {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    pickupTime: '',
    pickupDate: '',
  });

  const menu = [
    { id: 1, name: 'Margherita', price: 10, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, name: 'Pepperoni', price: 12, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, name: 'Vegetarian', price: 11, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
    { id: 4, name: 'Hawaiian', price: 13, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const itemToRemove = cart[index];
    if (itemToRemove.quantity > 0) {
      if (window.confirm(`Are you sure you want to remove ${itemToRemove.name} from your cart?`)) {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
      }
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedCart = [...cart];
      updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      setCart(updatedCart);
    }
  };

  const handleInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const pickupDateTime = new Date(`${customerInfo.pickupDate}T${customerInfo.pickupTime}`);
      if (isNaN(pickupDateTime.getTime())) throw new Error('Invalid pickup date/time');

      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        itemsOrdered: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
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
    switch (step) {
      case 1:
        return <MenuSelection key="menu-selection" menu={menu} addToCart={addToCart} />;
      case 2:
        return <CustomerInfo key="customer-info" customerInfo={customerInfo} handleInfoChange={handleInfoChange} />;
      case 3:
        return <Payment key="payment" totalPrice={totalPrice} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="py-5">
      <Row className="justify-content-center">
        <Col md={12} lg={12}>
          <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Order Your Pizza</h2>
              <ProgressBar now={(step / 3) * 100} className="mb-5" style={{ height: '8px' }} />
              <Row>
                <Col lg={6} className="pe-lg-4 mb-4 mb-lg-0">
                  <AnimatePresence initial={false} custom={step} exitBeforeEnter={false}>
                    {renderStep()}
                  </AnimatePresence>
                </Col>
                <Col lg={4}>
                  <OrderSummary
                    cart={cart}
                    totalPrice={totalPrice}
                    removeFromCart={removeFromCart}
                    updateQuantity={handleQuantityChange}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-between mt-5">
                {step > 1 && (
                  <Button variant="outline-primary" onClick={prevStep} className="px-4 py-2">
                    <i className="fas fa-chevron-left me-2"></i>Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={cart.length === 0}
                    className="px-4 py-2 ms-auto"
                  >
                    Next<i className="fas fa-chevron-right ms-2"></i>
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={cart.length === 0}
                    className="px-4 py-2 ms-auto"
                  >
                    Place Order<i className="fas fa-check ms-2"></i>
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TakeawayPage;
