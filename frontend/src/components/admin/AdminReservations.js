import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Badge, Spinner, Dropdown, Modal } from 'react-bootstrap';
import { fetchReservations, deleteReservation, updateReservation } from '../handlers/adminHandler';
import ReservationStatsCards from '../admin/ReservationStatsCards';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('reservationTime');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', guests: 1, reservationTime: '' });

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

  const handleDelete = (reservation) => {
    setSelectedReservation(reservation);
    setShowConfirmModal(true);
  };
  

  const confirmDelete = async () => {
    if (selectedReservation) {
      try {
        const success = await deleteReservation(selectedReservation.phone);
        if (success) {
          setReservations(prevReservations => 
            prevReservations.filter(res => res.phone !== selectedReservation.phone)
          );
        } else {
          console.error('Failed to delete reservation');
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      } finally {
        setShowConfirmModal(false);
        setSelectedReservation(null);
      }
    }
  };
  

  const handleEdit = (reservation) => {
    setEditFormData({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      guests: reservation.guests,
      reservationTime: reservation.reservationTime
    });
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (selectedReservation) {
      try {
        const updatedReservation = await updateReservation(selectedReservation.id, editFormData);
        setReservations(prevReservations => 
          prevReservations.map(res => 
            res.id === updatedReservation.id ? updatedReservation : res
          )
        );
        setShowEditModal(false);
      } catch (error) {
        console.error('Error updating reservation:', error);
      }
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setReservations(prevReservations =>
      prevReservations.map(reservation =>
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
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
      <ReservationStatsCards />
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
                confirmationNumber {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
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
                <td>{reservation.confirmationNumber}</td>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.guests}</td>
                <td>{new Date(reservation.reservationTime).toLocaleString()}</td>
                <td>{getStatusBadge(reservation.status)}</td>
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
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(reservation)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(reservation)}>
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

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the reservation for {selectedReservation?.name} with phone number {selectedReservation?.phone}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                value={editFormData.guests}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reservation Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="reservationTime"
                value={editFormData.reservationTime ? new Date(editFormData.reservationTime).toISOString().slice(0, -1) : ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminReservations;
