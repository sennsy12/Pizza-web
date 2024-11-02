// components/ReservationStatsCards.js

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { fetchReservationStats } from '../handlers/reservationHandler';
import { FaUsers, FaCalendarAlt, FaUserFriends, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Card className="text-center h-100 shadow-sm">
      <Card.Body className="d-flex flex-column justify-content-center">
        {icon}
        <Card.Title className="mt-3 mb-2">{title}</Card.Title>
        <Card.Text className="fs-4 fw-bold">{value}</Card.Text>
      </Card.Body>
    </Card>
  </motion.div>
);

const ReservationStatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchReservationStats();
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
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-center py-5 text-muted">No statistics available.</p>;
  }

  const statCards = [
    { title: 'Total Guests', value: stats.totalGuests, icon: <FaUsers size={30} className="text-primary" /> },
    { title: 'Total Reservations', value: stats.totalReservations, icon: <FaCalendarAlt size={30} className="text-success" /> },
    { title: 'Guests Today', value: stats.guestsToday, icon: <FaUserFriends size={30} className="text-info" /> },
    { title: 'Reservations Today', value: stats.reservationsToday, icon: <FaCalendarAlt size={30} className="text-warning" /> },
    { title: 'Avg. Guests per Reservation', value: (parseFloat(stats.averageGuestsPerReservation) || 0).toFixed(2), icon: <FaUsers size={30} className="text-danger" /> },
    { title: 'Latest Reservation Today', value: new Date(stats.latestReservationToday).toLocaleTimeString(), icon: <FaClock size={30} className="text-primary" /> },
  ];

  return (
    <Row className="g-4 py-4">
      {statCards.map((card, index) => (
        <Col key={index} sm={2} md={2}>
          <StatCard {...card} />
        </Col>
      ))}
    </Row>
  );
};

export default ReservationStatsCards;
