import React from 'react';
import { Row, Col, Card, Button, Badge, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Cart } from 'react-bootstrap-icons';

const MenuSelection = ({ menu, addToCart }) => {
  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });  // Always add 1 pizza to the cart
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
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="h-100 shadow">
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <Card.Img 
                            variant="top" 
                            src={item.image} 
                            alt={item.name} 
                            style={{ height: '120px', objectFit: 'cover' }}
                          />
                          <Badge 
                            bg="primary" 
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              fontSize: '1rem',
                              padding: '8px 12px'
                            }}
                          >
                            ${item.price.toFixed(2)}
                          </Badge>
                        </div>
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text className="text-muted">{item.description}</Card.Text>
                          <Button 
                            variant="primary" 
                            onClick={() => handleAddToCart(item)} 
                            className="w-100"
                          >
                            <Cart className="me-1" />
                            Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </motion.div>
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