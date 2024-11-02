import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Badge, Navbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger, FaUtensils, FaIceCream, FaAppleAlt } from 'react-icons/fa'; // Import the icons
import { fetchMenuItems } from '../handlers/menuHandler'; // Update this path to where your handler is located

const MenuItem = ({ item }) => (
  <Card className="h-100 border-0 shadow-sm rounded">
    <Card.Img variant="top" src={item.img} alt={item.name} className="rounded-top" style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>{item.description}</Card.Text>
      <Badge bg="primary">${item.price}</Badge>
    </Card.Body>
  </Card>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Beverages');
  const [menuItems, setMenuItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // List of categories
  const categories = ['Appetizers','Pizza', 'Hamburgers', 'Desserts', 'Beverages'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const items = await fetchMenuItems(); 
        setMenuItems(items); 
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter(item =>
    item.category === activeCategory 
  );

  // Icons for each category
  const icons = {
    Appetizers: <FaUtensils />,
    Pizza: <FaPizzaSlice />,
    Hamburgers: <FaHamburger />,
    Desserts: <FaIceCream />,
    Beverages: <FaGlassWhiskey />,
  };

  if (loading) return <p>Loading menu...</p>; 
  if (error) return <p>{error}</p>; 

  return (
    <Container fluid className="px-0">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Our Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {categories.map((category) => (
                <Nav.Link
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`${activeCategory === category ? 'active' : ''}`}
                >
                  {icons[category] || <FaHamburger />} {category}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="mb-4">{activeCategory}</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredItems.map((item) => (
                <Col key={item.id}>
                  <MenuItem item={item} />
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Container>
  );
};

export default Menu;
