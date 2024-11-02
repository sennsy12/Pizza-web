import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Tab, Nav, Badge, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Cart } from 'react-bootstrap-icons';
import { fetchMenuItems } from '../handlers/menuHandler';

const MenuSelection = ({ addToCart }) => {
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingItems, setLoadingItems] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenu(items);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = async (item) => {
    setLoadingItems((prev) => ({ ...prev, [item.id]: true }));
    await new Promise((resolve) => setTimeout(resolve, 200));
    addToCart({ ...item, quantity: 1 });
    setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
  };

  const categories = ['All', ...new Set(menu.map((item) => item.category))];
  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter((item) => item.category === activeCategory);

  if (error) return <p>{error}</p>;

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
                          src={item.img}
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
                          ${item.price}
                        </Badge>
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="text-center mb-2">{item.name}</Card.Title>
                        <Card.Text className="text-muted text-center mb-3">{item.description}</Card.Text>
                        <div className="mt-auto">
                          <Button
                            variant="primary"
                            onClick={() => handleAddToCart(item)}
                            disabled={loadingItems[item.id]}
                            className="w-100"
                            aria-label={`Add ${item.name} to cart`}
                          >
                            {loadingItems[item.id] ? <Spinner animation="border" size="sm" /> : <Cart className="me-2" />}
                            {loadingItems[item.id] ? 'Adding...' : 'Add to Cart'}
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
