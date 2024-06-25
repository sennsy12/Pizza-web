import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import createReservation from '../handlers/reservationHandler'; // Adjust the path as necessary
import moment from 'moment'; // Import Moment.js

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
      const data = await createReservation({
        ...formData,
        // Convert reservationTime to UTC ISO string
        reservationTime: moment.utc(formData.reservationTime).toISOString(),
      });

      // Redirect to the confirmation page with reservation details
      navigate('/confirmation', { state: { reservation: data } });
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Make a Reservation</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit">
              Make Reservation
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
