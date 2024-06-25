import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const pizzas = [
  {
    name: 'Margherita',
    description: 'Tomato, mozzarella, and basil',
    img: 'https://example.com/margherita.jpg',
    price: '$12.99'
  },
  {
    name: 'Pepperoni',
    description: 'Tomato, mozzarella, and pepperoni',
    img: 'https://example.com/pepperoni.jpg',
    price: '$14.99'
  },
  {
    name: 'BBQ Chicken',
    description: 'BBQ sauce, chicken, and red onions',
    img: 'https://example.com/bbq_chicken.jpg',
    price: '$16.99'
  },
  {
    name: 'Hawaiian',
    description: 'Tomato, mozzarella, ham, and pineapple',
    img: 'https://example.com/hawaiian.jpg',
    price: '$15.99'
  },
  {
    name: 'Veggie',
    description: 'Tomato, mozzarella, and assorted vegetables',
    img: 'https://example.com/veggie.jpg',
    price: '$13.99'
  }
];

const Menu = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Popular Pizzas</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {pizzas.map((pizza, index) => (
          <Col key={index}>
            <Card className="h-100 border-0 shadow-sm">
              <div className="position-relative overflow-hidden rounded">
                <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
                <div className="overlay bg-dark position-absolute top-0 start-0 w-100 h-100 opacity-0 transition">
                  <div className="overlay-content d-flex justify-content-center align-items-center">
                    <Button as={Link} to={`/menu/${pizza.name}`} className="btn btn-primary stretched-link">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold mb-2">{pizza.name}</Card.Title>
                <Card.Text className="text-muted">{pizza.description}</Card.Text>
                <Card.Text className="fw-bold">${pizza.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Menu;
