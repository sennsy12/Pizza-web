// containers/Menu.js

import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Badge, Navbar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger } from 'react-icons/fa';


const menuItems = {
  pizzas: [
    { name: 'Margherita', description: 'Tomato, mozzarella, and basil', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', price: '12.99' },
    { name: 'Pepperoni', description: 'Tomato, mozzarella, and pepperoni', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', price: '14.99' },
  ],
  drinks: [
    { name: 'Cola', description: 'Refreshing cola drink', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', price: '2.99' },
    { name: 'Lemonade', description: 'Fresh squeezed lemonade', img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', price: '3.99' },
  ],
  burgers: [
    { name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and cheese', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', price: '9.99' },
    { name: 'Veggie Burger', description: 'Plant-based patty with avocado and sprouts', img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', price: '10.99' },
  ]
};

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
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const icons = {
    pizzas: <FaPizzaSlice />,
    drinks: <FaGlassWhiskey />,
    burgers: <FaHamburger />
  };

  return (
    <Container fluid className="px-0">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Our Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {Object.keys(menuItems).map((category) => (
                <Nav.Link
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`${activeCategory === category ? 'active' : ''}`}
                >
                  {icons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
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
            <h2 className="mb-4">{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredItems.map((item, index) => (
                <Col key={index}>
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