// components/ReservationStatsCards.js

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { fetchReservationStats } from '../handlers/reservationHandler';

const ReservationStatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchReservationStats();
        console.log('Fetched Stats:', data);  // Log the fetched data
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch reservation stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);
  

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-center">No statistics available.</p>;
  }

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Total Guests</Card.Title>
            <Card.Text>{stats.total_guests}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Total Reservations</Card.Title>
            <Card.Text>{stats.total_reservations}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ReservationStatsCards;
