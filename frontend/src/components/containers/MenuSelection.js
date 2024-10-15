import React, { useState } from 'react';
import { Row, Col, Card, Button, Tab, Nav, Badge, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Cart } from 'react-bootstrap-icons';

const MenuSelection = ({ menu, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (item) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulating an API call delay
    addToCart({ ...item, quantity: 1 });
    setLoading(false);
  };

  const categories = ['All', ...new Set(menu.map((item) => item.category))];

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter((item) => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-4">Explore Our Menu</h2>
      
      <Tab.Container activeKey={activeCategory} onSelect={(k) => setActiveCategory(k)}>
        <Nav justify variant="pills" className="mb-4">
          {categories.map((category) => (
            <Nav.Item key={category}>
              <Nav.Link eventKey={category} className="text-capitalize">
                {category}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey={activeCategory}>
            <Row className="g-4">
              {filteredMenu.map((item) => (
                <Col md={4} lg={3} key={item.id}>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="h-100"
                  >
                    <Card className="h-100 shadow-sm border-0">
                      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                        <Card.Img
                          variant="top"
                          src={item.image}
                          alt={item.name}
                          style={{ height: '160px', objectFit: 'cover', filter: 'brightness(90%)' }}
                        />
                        <Badge
                          bg="success"
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            fontSize: '1rem',
                            padding: '6px 10px',
                            borderRadius: '12px',
                          }}
                        >
                          ${item.price.toFixed(2)}
                        </Badge>
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-center mb-2">{item.name}</Card.Title>
                        <Card.Text className="text-muted text-center mb-3">{item.description}</Card.Text>
                        <div className="mt-auto">
                          <Button
                            variant="primary"
                            onClick={() => handleAddToCart(item)}
                            disabled={loading}
                            className="w-100"
                            aria-label={`Add ${item.name} to cart`}
                          >
                            {loading ? <Spinner animation="border" size="sm" /> : <Cart className="me-2" />}
                            {loading ? 'Adding...' : 'Add to Cart'}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </motion.div>
  );
};

export default MenuSelection;
