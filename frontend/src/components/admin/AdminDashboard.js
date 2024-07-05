import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Reservations</Card.Title>
              <Card.Text>
                Manage customer reservations.
              </Card.Text>
              <Link to="/admin/reservations" className="btn btn-primary">
                Manage Reservations
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Takeaway Orders</Card.Title>
              <Card.Text>
                Manage takeaway orders.
              </Card.Text>
              <Link to="/admin/takeaway-orders" className="btn btn-primary">
                Manage Takeaway Orders
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
