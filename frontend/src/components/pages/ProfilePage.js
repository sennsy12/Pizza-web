// ProfilePage.js
// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Badge, Modal, Button } from 'react-bootstrap';
import { Person, Calendar, BagCheck, GraphUp } from 'react-bootstrap-icons';
import { fetchProfileData } from '../handlers/profileHandler';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (error) {
        setError(error.message || 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    getProfileData();
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

  const getStatusBadgeVariant = (status) => {
    const variants = {
      upcoming: 'primary',
      imminent: 'warning',
      past: 'secondary',
      completed: 'success',
      ready_soon: 'info',
      scheduled: 'primary'
    };
    return variants[status] || 'secondary';
  };

  // Render reservation item
  const ReservationItem = ({ reservation }) => (
    <ListGroup.Item>
      <Badge bg={getStatusBadgeVariant(reservation.reservation_status)} className="mb-2">
        {reservation.reservation_status}
      </Badge>
      <div><strong>{new Date(reservation.reservationTime).toLocaleDateString()}</strong></div>
      <div>Time: {new Date(reservation.reservationTime).toLocaleTimeString()}</div>
      <div>Guests: {reservation.guests}</div>
      {reservation.confirmation_number && 
        <div>Confirmation: {reservation.confirmation_number}</div>
      }
    </ListGroup.Item>
  );

  // Render order item
  const OrderItem = ({ order }) => (
    <ListGroup.Item>
      <Badge bg={getStatusBadgeVariant(order.order_status)} className="mb-2">
        {order.order_status}
      </Badge>
      <div><strong>Order #{order.order_number}</strong></div>
      <div>Pickup: {new Date(order.pickupTime).toLocaleString()}</div>
      <div>Total: ${order.totalAmount}</div>
      <div>Items: {order.quantity}</div>
    </ListGroup.Item>
  );

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">
            Profile Information
            <Badge bg={customer.tier === 'VIP' ? 'warning' : 'secondary'} className="ms-2">
              {customer.tier}
            </Badge>
          </h1>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="d-flex align-items-center bg-primary text-white">
              <Person className="me-2" /> Customer Details
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <strong>Name:</strong> {customer.name} {customer.lastName}<br />
                <strong>Email:</strong> {customer.email}<br />
                <strong>Phone:</strong> {customer.phone}<br />
                <strong>Member Since:</strong> {new Date(customer.createdAt).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="d-flex align-items-center bg-info text-white">
              <GraphUp className="me-2" /> Statistics
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Total Spent on Takeaway:</strong> ${customer.statistics.totalSpent}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total Reservations:</strong> {customer.statistics.totalReservations}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Average Party Size:</strong> {customer.statistics.averagePartySize}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Upcoming Reservations:</strong> {customer.statistics.upcomingReservations}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="d-flex align-items-center bg-success text-white justify-content-between">
              <div>
                <Calendar className="me-2" /> Recent Reservations
              </div>
              <Button 
                size="sm" 
                variant="light" 
                onClick={() => setShowReservationsModal(true)}
              >
                View All
              </Button>
            </Card.Header>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {reservations.slice(0, 5).map(reservation => (
                  <ReservationItem key={reservation.id} reservation={reservation} />
                ))}
              </ListGroup>
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5" className="d-flex align-items-center bg-warning text-dark justify-content-between">
              <div>
                <BagCheck className="me-2" /> Recent Takeaway Orders
              </div>
              <Button 
                size="sm" 
                variant="light" 
                onClick={() => setShowOrdersModal(true)}
              >
                View All
              </Button>
            </Card.Header>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {takeawayOrders.slice(0, 5).map(order => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </ListGroup>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Reservations Modal */}
      <Modal 
        show={showReservationsModal} 
        onHide={() => setShowReservationsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Reservations</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <ListGroup variant="flush">
            {reservations.map(reservation => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* Orders Modal */}
      <Modal 
        show={showOrdersModal} 
        onHide={() => setShowOrdersModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Takeaway Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <ListGroup variant="flush">
            {takeawayOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
