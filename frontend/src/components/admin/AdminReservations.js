import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Badge, Spinner, Dropdown } from 'react-bootstrap';
import { fetchReservations } from '../handlers/adminHandler';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('reservationTime');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReservations();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredReservations = sortedReservations.filter(
    (reservation) =>
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete reservation with id:', id);
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit reservation with id:', id);
  };

  const handleStatusChange = (id, newStatus) => {
    setReservations(reservations.map(reservation => 
      reservation.id === id ? {...reservation, status: newStatus} : reservation
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge bg="primary">Confirmed</Badge>;
      case 'Seated':
        return <Badge bg="info">Seated</Badge>;
      case 'Done':
        return <Badge bg="success">Done</Badge>;
      case 'Canceled':
        return <Badge bg="danger">Canceled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getRowStyle = (status) => {
    switch (status) {
      case 'Done':
        return { backgroundColor: '#d4edda' };
      case 'Canceled':
        return { backgroundColor: '#f8d7da' };
      default:
        return {};
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-primary">All Reservations</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Phone</th>
              <th>Guests</th>
              <th onClick={() => handleSort('reservationTime')} style={{ cursor: 'pointer' }}>
                Time {sortField === 'reservationTime' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} style={getRowStyle(reservation.status)}>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.guests}</td>
                <td>{new Date(reservation.reservationTime).toLocaleString()}</td>
                <td>
                  {getStatusBadge(reservation.status)}
                </td>
                <td>
                  <Dropdown className="d-inline mr-2">
                    <Dropdown.Toggle variant="outline-secondary" size="sm" id={`dropdown-${reservation.id}`}>
                      Change Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleStatusChange(reservation.id, 'Confirmed')}>Confirmed</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(reservation.id, 'Seated')}>Seated</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(reservation.id, 'Done')}>Done</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChange(reservation.id, 'Canceled')}>Canceled</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(reservation.id)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(reservation.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && filteredReservations.length === 0 && (
        <p className="text-center">No reservations found.</p>
      )}
    </Container>
  );
};

export default AdminReservations;
