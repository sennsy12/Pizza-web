import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaShoppingBag } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #007bff;
`;

const AdminDashboard = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Admin Dashboard</h1>
      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <StyledCard className="text-center h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <IconWrapper>
                  <FaCalendarAlt />
                </IconWrapper>
                <Card.Title className="mb-3">Reservations</Card.Title>
                <Card.Text>
                  View and manage customer reservations. Keep track of bookings and update reservation statuses.
                </Card.Text>
              </div>
              <Link to="/admin/reservations" className="btn btn-primary mt-3">
                Manage Reservations
              </Link>
            </Card.Body>
          </StyledCard>
        </Col>
        <Col md={5} className="mb-4">
          <StyledCard className="text-center h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <IconWrapper>
                  <FaShoppingBag />
                </IconWrapper>
                <Card.Title className="mb-3">Takeaway Orders</Card.Title>
                <Card.Text>
                  Monitor and process takeaway orders. Ensure timely preparation and pickup of customer orders.
                </Card.Text>
              </div>
              <Link to="/admin/takeaway-orders" className="btn btn-primary mt-3">
                Manage Takeaway Orders
              </Link>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
