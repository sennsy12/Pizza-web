import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaGlassWhiskey, FaHamburger } from 'react-icons/fa';

const menuItems = {
  pizzas: [
    {
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '12.99'
    },
    {
      name: 'Pepperoni',
      description: 'Tomato, mozzarella, and pepperoni',
      img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '14.99'
    },
    {
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '12.99'  
    },
    {
      name: 'Pepperoni',
      description: 'Tomato, mozzarella, and pepperoni',
      img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '14.99'
    },
    {
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '12.99'
    },
    {
      name: 'Pepperoni',
      description: 'Tomato, mozzarella, and pepperoni',
      img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '14.99'
    },
    {
      name: 'Margherita',
      description: 'Tomato, mozzarella, and basil',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '12.99'
    },
    {
      name: 'Pepperoni',
      description: 'Tomato, mozzarella, and pepperoni',
      img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '14.99'
    },
  ],
  drinks: [
    {
      name: 'Cola',
      description: 'Refreshing cola drink',
      img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
      price: '2.99'
    },
    {
      name: 'Lemonade',
      description: 'Fresh squeezed lemonade',
      img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
      price: '3.99'
    },
  ],
  burgers: [
    {
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, and cheese',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
      price: '9.99'
    },
    {
      name: 'Veggie Burger',
      description: 'Plant-based patty with avocado and sprouts',
      img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80',
      price: '10.99'
    },
  ]
};

const MenuItem = ({ item }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="h-100 border-0 shadow-sm">
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <Card.Img
          variant="top"
          src={item.img}
          alt={item.name}
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
        <div className="overlay bg-dark position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ opacity: 0, transition: 'opacity 0.3s' }}>
          <Button as={Link} to={`/menu/${item.name}`} className="btn btn-primary">
            View Details
          </Button>
        </div>
      </div>
      <Card.Body className="text-center">
        <Card.Title className="fw-bold mb-2">{item.name}</Card.Title>
        <Card.Text className="text-muted">{item.description}</Card.Text>
        <Badge pill bg="secondary" className="mb-2">${item.price}</Badge>
      </Card.Body>
    </Card>
  </motion.div>
);

const Menu = () => {
  const [activeKey, setActiveKey] = useState('0');
  const icons = {
    pizzas: <FaPizzaSlice />,
    drinks: <FaGlassWhiskey />,
    burgers: <FaHamburger />
  };

  return (
    <Container className="mt-5 mb-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Our Menu</h2>
      </motion.div>
      <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        {Object.entries(menuItems).map(([category, items], index) => (
          <Accordion.Item eventKey={index.toString()} key={category}>
            <Accordion.Header>
              <h3 className="mb-0 d-flex align-items-center">
                {icons[category]} <span className="ms-2">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </h3>
            </Accordion.Header>
            <Accordion.Body>
              <AnimatePresence>
                {activeKey === index.toString() && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Row xs={1} md={2} lg={3} className="g-4">
                      {items.map((item, itemIndex) => (
                        <Col key={itemIndex}>
                          <MenuItem item={item} />
                        </Col>
                      ))}
                    </Row>
                  </motion.div>
                )}
              </AnimatePresence>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Menu;


