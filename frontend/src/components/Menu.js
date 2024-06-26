import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pizzas = [
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
    name: 'BBQ Chicken',
    description: 'BBQ sauce, chicken, and red onions',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: '16.99'
  },
  {
    name: 'Hawaiian',
    description: 'Tomato, mozzarella, ham, and pineapple',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: '15.99'
  },
  {
    name: 'Veggie',
    description: 'Tomato, mozzarella, and assorted vegetables',
    img: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: '13.99'
  }
];

const Menu = () => {
  return (
    <Container className="mt-5 mb-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Our Pizza Selection</h2>
      </motion.div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {pizzas.map((pizza, index) => (
          <Col key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="h-100 border-0 shadow-sm">
                <div className="position-relative overflow-hidden" style={{height: '200px'}}>
                  <Card.Img 
                    variant="top" 
                    src={pizza.img} 
                    alt={pizza.name}
                    style={{objectFit: 'cover', height: '100%', width: '100%'}}
                  />
                  <div className="overlay bg-dark position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                       style={{opacity: 0, transition: 'opacity 0.3s'}}>
                    <Button as={Link} to={`/menu/${pizza.name}`} className="btn btn-primary">
                      View Details
                    </Button>
                  </div>
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold mb-2">{pizza.name}</Card.Title>
                  <Card.Text className="text-muted">{pizza.description}</Card.Text>
                  <Card.Text className="fw-bold">${pizza.price}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Menu;
