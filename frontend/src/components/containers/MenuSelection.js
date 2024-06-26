import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';

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

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled(Button)`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
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

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
      <h2 className="mb-4">Select Your Pizzas</h2>
      <Row>
        {menu.map((item) => (
          <Col md={6} key={item.id}>
            <StyledCard whileHover={{ scale: 1.01 }} whileTap={{ scale: 1.00 }}>
              <Card>
                <MenuImage src={item.image} alt={item.name} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  <QuantityControl>
                    <QuantityButton variant="outline-primary" onClick={() => decrementQuantity(item.id)}><DashSquare /></QuantityButton>
                    <span className="mx-2">{quantities[item.id] || 0}</span>
                    <QuantityButton variant="outline-primary" onClick={() => incrementQuantity(item.id)}><PlusSquare /></QuantityButton>
                    <Button variant="primary" onClick={() => handleAddToCart(item)} className="ms-auto">Add to Cart</Button>
                  </QuantityControl>
                </Card.Body>
              </Card>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default MenuSelection;
