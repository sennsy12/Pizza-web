import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import createReservation from '../handlers/reservationHandler';
import moment from 'moment-timezone';
import { motion } from 'framer-motion';
import FeatureSection from './HomePageFeature';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '+47',
    guests: '',
    reservationTime: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert local time to UTC
      const localTime = moment(formData.reservationTime);
      const utcTime = localTime.utc().format();

      const data = await createReservation({
        ...formData,
        reservationTime: utcTime,
      });
      navigate('/confirmation', { state: { reservation: data } });
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <Container className="p-0" style={{ paddingTop: '60px' }}> {/* Adjust padding to match header height */}
      <Carousel fade interval={5000} className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Delicious Pizza"
            style={{ objectFit: 'cover', height: '300px' }} // Reduced height
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>Savor the Flavor</h3>
            <p>Book your table for an unforgettable pizza experience!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Pizza Oven"
            style={{ objectFit: 'cover', height: '300px' }} // Reduced height
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>Authentic Wood-Fired Pizzas</h3>
            <p>Experience the taste of tradition in every bite.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Pizza Ingredients"
            style={{ objectFit: 'cover', height: '300px' }} // Reduced height
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>Fresh Ingredients</h3>
            <p>We use only the finest, locally-sourced ingredients.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-3">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center mb-4">Reserve Your Pizza Paradise</h2>
        </motion.div>

        <Row className="justify-content-center mb-3">
          <Col md={8}>
            <Card className="shadow-lg">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your last name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formGuests">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formReservationTime">
                        <Form.Label>Reservation Time</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          name="reservationTime"
                          value={formData.reservationTime}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="primary" type="submit" className="w-100">
                      Book Your Pizza Experience
                    </Button>
                  </motion.div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ReservationForm;
