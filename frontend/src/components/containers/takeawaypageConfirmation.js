import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const TakeawaypageConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 rounded-lg">
            <Card.Body className="p-5 text-center">
              <h2 className="mb-4">Order Confirmation</h2>
              <p className="mb-4">Thank you for your order, {orderData?.customerName}!</p>
              <p className="mb-4">
                Your order will be ready for pickup on{' '}
                <strong>{moment.utc(orderData?.pickupTime).tz('Europe/Oslo').format('YYYY-MM-DD HH:mm:ss')}</strong>.
              </p>
              <p className="mb-4">Order Summary:</p>
              <ul className="list-unstyled">
                {orderData?.itemsOrdered.map((item) => (
                  <li key={item.id}>
                    {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <h4>Total: ${orderData?.totalAmount.toFixed(2)}</h4>
              <Button variant="primary" className="mt-4" onClick={handleGoHome}>
                Go Home
              </Button>        
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TakeawaypageConfirmation;