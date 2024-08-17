import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger } from 'react-icons/fa';
import styled from 'styled-components';

// Styled components for custom design
const Sidebar = styled.div`
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  position: fixed;
  width: 250px;
  padding: 2rem;
  transition: all 0.3s ease;
  border-radius: 5px;
`;

const MainContent = styled.div`
  margin-left: 250px;
  padding: 2rem;
  background-color: #ecf0f1;
  min-height: 100vh;
`;

const CategoryButton = styled(Nav.Link)`
  color: white;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover, &.active {
    background-color: #34495e;
    color: #3498db;
  }
`;

const MenuCard = styled(Card)`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

// Sample menu items (keep the same as before)
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
  <MenuCard className="h-100 border-0 shadow-sm">
    <Card.Img variant="top" src={item.img} alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>{item.description}</Card.Text>
      <Badge bg="primary">${item.price}</Badge>
    </Card.Body>
  </MenuCard>
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
    <Container fluid className="p-0">
      <Row noGutters>
        <Sidebar>
          <h2 className="text-center mb-4">Our Menu</h2>
          <Nav className="flex-column">
            {Object.keys(menuItems).map((category) => (
              <CategoryButton
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? 'active' : ''}
              >
                {icons[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
              </CategoryButton>
            ))}
          </Nav>
        </Sidebar>

        <MainContent>
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
        </MainContent>
      </Row>
    </Container>
  );
};

export default Menu;