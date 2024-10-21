import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { Person, Calendar, BagCheck } from 'react-bootstrap-icons';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5001/api/profile/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        setError('Error fetching profile data. Please try again later.');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const { customer, reservations, takeawayOrders } = profileData;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Profile Information</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5" className="d-flex align-items-center">
              <Person className="me-2" /> Customer Details
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Name:</strong> {customer.name} {customer.lastName}<br />
                <strong>Email:</strong> {customer.email}<br />
                <strong>Phone:</strong> {customer.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5" className="d-flex align-items-center">
              <Calendar className="me-2" /> Reservations
            </Card.Header>
            <ListGroup variant="flush">
              {reservations.map(reservation => (
                <ListGroup.Item key={reservation.id}>
                  <strong>{new Date(reservation.reservationTime).toLocaleString()}</strong>
                  <br />Guests: {reservation.guests}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5" className="d-flex align-items-center">
              <BagCheck className="me-2" /> Takeaway Orders
            </Card.Header>
            <ListGroup variant="flush">
              {takeawayOrders.map(order => (
                <ListGroup.Item key={order.id}>
                  <strong>Order #{order.order_number}</strong>
                  <br />Total: ${order.total_amount.toFixed(2)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;