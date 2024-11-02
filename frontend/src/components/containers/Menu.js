import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Badge, Navbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger, FaUtensils, FaIceCream, FaListAlt } from 'react-icons/fa'; 
import { fetchMenuItems } from '../handlers/menuHandler'; 

const MenuItem = ({ item }) => (
  <Card className="h-100 border-0 shadow-sm rounded">
    <Card.Img
      variant="top"
      src={`${item.img}.png`} 
      alt={item.name}
      className="rounded-top"
      style={{ height: '200px', objectFit: 'scale-down', backgroundColor: '#f8f9fa' }}
    />
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>{item.description}</Card.Text>
      <Badge bg="primary">${item.price}</Badge>
    </Card.Body>
  </Card>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuItems, setMenuItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // List of categories
  const categories = ['All', 'Appetizers', 'Pizza', 'Hamburgers', 'Desserts', 'Beverages'];

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

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  // Icons for each category
  const icons = {
    All: <FaListAlt />, // Use a general icon for 'All'
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
