import React, { useState } from 'react';
import { Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PlusSquare, DashSquare, Cart } from 'react-bootstrap-icons';

const StyledCard = styled(motion.div)`
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const MenuImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const QuantityButton = styled(Button)`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 0;
`;

const PriceTag = styled(Badge)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1rem;
  padding: 8px 12px;
`;

const MenuSelection = ({ menu, addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const incrementQuantity = (itemId) => {
    setQuantities({ ...quantities, [itemId]: (quantities[itemId] || 0) + 1 });
  };

  const decrementQuantity = (itemId) => {
    if (quantities[itemId] > 0) {
      setQuantities({ ...quantities, [itemId]: quantities[itemId] - 1 });
    }
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 0;
    if (quantity > 0) {
      addToCart({ ...item, quantity });
      setQuantities({ ...quantities, [item.id]: 0 });
    }
  };

  // Categorize menu items
  const categorizedMenu = menu.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4">Select Your Pizzas</h2>
      <Accordion defaultActiveKey="0">
        {Object.keys(categorizedMenu).map((category, index) => (
          <Accordion.Item eventKey={index.toString()} key={category}>
            <Accordion.Header>{category}</Accordion.Header>
            <Accordion.Body>
              <Row>
                {categorizedMenu[category].map((item) => (
                  <Col md={6} key={item.id}>
                    <StyledCard>
                      <Card>
                        <div style={{ position: 'relative' }}>
                          <MenuImage src={item.image} alt={item.name} />
                          <PriceTag bg="primary">${item.price.toFixed(2)}</PriceTag>
                        </div>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text className="text-muted">{item.description}</Card.Text>
                          <QuantityControl>
                            <QuantityButton variant="outline-primary" onClick={() => decrementQuantity(item.id)}><DashSquare /></QuantityButton>
                            <span className="mx-3 fw-bold">{quantities[item.id] || 0}</span>
                            <QuantityButton variant="outline-primary" onClick={() => incrementQuantity(item.id)}><PlusSquare /></QuantityButton>
                            <Button 
                              variant="primary" 
                              onClick={() => handleAddToCart(item)} 
                              className="ms-auto"
                              disabled={!quantities[item.id]}
                            >
                              <Cart className="me-1" />
                              Add to Cart
                            </Button>
                          </QuantityControl>
                        </Card.Body>
                      </Card>
                    </StyledCard>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default MenuSelection;
