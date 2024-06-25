import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';

const ReservationPageConfirmation = () => {
  const location = useLocation();
  const { reservation } = location.state;

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="bg-dark text-light text-center"> {/* Center-align header text */}
          <h3>Reservation Confirmation</h3>
        </Card.Header>
        <Card.Body className="bg-light">
          <Row className="justify-content-center"> {/* Center-align content within the row */}
            <Col md={8} className="text-center"> {/* Center-align content within the column */}
              <h4 className="mb-4 mt-2">Reservation Details</h4>
              <p>
                <strong>Name:</strong> {reservation.name} {reservation.lastName}<br />
                <strong>Email:</strong> {reservation.email}<br />
                <strong>Phone:</strong> {reservation.phone}<br />
                <strong>Number of Guests:</strong> {reservation.guests}<br />
                <strong>Reservation Time:</strong> {new Date(reservation.reservationTime).toLocaleString()}
              </p>
              <p className="mt-4">
                Thank you for choosing us! We look forward to welcoming you.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReservationPageConfirmation;
