
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { createTakeawayOrder } from '../handlers/takeawayHandler';
import MenuSelection from '../containers/MenuSelection';
import CustomerInfo from '../containers/CustomerInfo';
import Payment from '../containers/Payment';
import OrderSummary from '../containers/OrderSummary';

const STEP_MENU_SELECTION = 1;
const STEP_CUSTOMER_INFO = 2;
const STEP_PAYMENT = 3;

const TakeawayPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEP_MENU_SELECTION);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    pickupTime: '',
    pickupDate: '',
  });

  const menu = [
    // Pizzas
    { id: 1, name: 'Margherita', price: 10, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Classic tomato and mozzarella' },
    { id: 2, name: 'Pepperoni', price: 12, category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Pepperoni and cheese' },
    { id: 3, name: 'Vegetarian', price: 11, category: 'Pizza', image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Assorted vegetables' },
    { id: 4, name: 'Hawaiian', price: 13, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Ham and pineapple' },
    
    // Drinks
    { id: 5, name: 'Cola', price: 2, category: 'Drink', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Classic cola' },
    { id: 6, name: 'Lemonade', price: 2.5, category: 'Drink', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Fresh squeezed lemonade' },
    
    // Sides
    { id: 7, name: 'Caesar Salad', price: 6, category: 'Side', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Classic Caesar salad' },
    
    // Desserts
    { id: 8, name: 'Tiramisu', price: 5, category: 'Dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Italian coffee-flavored dessert' },
    { id: 9, name: 'Chocolate Brownie', price: 4, category: 'Dessert', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Rich chocolate brownie' },
  ];

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    if (index < 0 || index >= cart.length) return;

    const itemToRemove = cart[index];
    if (window.confirm(`Are you sure you want to remove ${itemToRemove.name} from your cart?`)) {
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 0) {
      setCart((prevCart) =>
        prevCart.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, STEP_PAYMENT));
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, STEP_MENU_SELECTION));

  const handleSubmit = async () => {
    try {
      const pickupDateTime = new Date(`${customerInfo.pickupDate}T${customerInfo.pickupTime}`);
      if (isNaN(pickupDateTime.getTime())) throw new Error('Invalid pickup date/time');

      // Convert to UTC
      const utcPickupTime = new Date(pickupDateTime.getTime() - pickupDateTime.getTimezoneOffset() * 60000);

      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        itemsOrdered: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        totalAmount: totalPrice,
        pickupTime: utcPickupTime.toISOString(),
      };

      await createTakeawayOrder(orderData);
      navigate('/takeawaypageConfirmation', { state: { orderData } });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case STEP_MENU_SELECTION:
        return <MenuSelection key="menu-selection" menu={menu} addToCart={addToCart} />;
      case STEP_CUSTOMER_INFO:
        return <CustomerInfo key="customer-info" customerInfo={customerInfo} handleInfoChange={handleInfoChange} />;
      case STEP_PAYMENT:
        return <Payment key="payment" totalPrice={totalPrice} />;
      default:
        return null;
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xl={12}>
          <Card className="shadow-lg border-0 rounded-lg overflow-hidden">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Order Your Meal</h2>
              <ProgressBar now={(step / STEP_PAYMENT) * 100} className="mb-5" style={{ height: '8px' }} />
              <Row>
                <Col xl={8} className="pe-lg-4 mb-4 mb-lg-0">
                  {renderStep()}
                </Col>
                <Col xl={4}>
                  <OrderSummary
                    cart={cart}
                    totalPrice={totalPrice}
                    removeFromCart={removeFromCart}
                    updateQuantity={handleQuantityChange}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-between mt-5">
                {step > STEP_MENU_SELECTION && (
                  <Button variant="outline-primary" onClick={prevStep} className="px-4 py-2">
                    <i className="fas fa-chevron-left me-2"></i>Back
                  </Button>
                )}
                {step < STEP_PAYMENT ? (
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
