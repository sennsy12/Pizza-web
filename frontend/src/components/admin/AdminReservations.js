import React, { useEffect, useState, forwardRef } from 'react';
import { Table, Button, Container, Row, Col, Form, Spinner, Modal, Card } from 'react-bootstrap';
import { fetchReservations, deleteReservation, updateReservation } from '../handlers/adminHandler';
import ReservationStatsCards from '../admin/ReservationStatsCards';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import nb from 'date-fns/locale/nb';

registerLocale('nb', nb);
setDefaultLocale('nb');

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Form.Control onClick={onClick} ref={ref} value={value} readOnly />
));

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    loadReservations();
  }, [startDate, endDate]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchReservations();
      const filteredData = data.filter(reservation => {
        const reservationDate = new Date(reservation.reservationTime);
        return reservationDate >= startDate && reservationDate <= endDate;
      });
      setReservations(filteredData);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const formatReservationTime = (time) => {
    return moment(time).tz('Europe/Oslo').format('DD.MM.YYYY HH:mm');
  };

  const parseReservationTime = (time) => {
    return moment.tz(time, 'Europe/Oslo').toDate();
  };

  const handleEdit = (reservation) => {
    setEditFormData({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      guests: reservation.guests,
      reservationTime: parseReservationTime(reservation.reservationTime)
    });
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditDateChange = (date) => {
    setEditFormData(prevState => ({ ...prevState, reservationTime: date }));
  };

  const handleEditSubmit = async () => {
    if (selectedReservation) {
      try {
        const updatedReservationData = {
          ...editFormData,
          reservationTime: moment(editFormData.reservationTime).tz('Europe/Oslo').format()
        };
        const updatedReservation = await updateReservation(selectedReservation.id, updatedReservationData);
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

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-primary">All Reservations</h1>
        </Col>
      </Row>
      <ReservationStatsCards />
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd.MM.yyyy"
                  className="form-control"
                  locale="nb"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd.MM.yyyy"
                  className="form-control"
                  locale="nb"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th onClick={() => handleSort('confirmationNumber')} style={{ cursor: 'pointer' }}>
                      Confirmation Number {sortField === 'confirmationNumber' && (sortDirection === 'asc' ? '▲' : '▼')}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.confirmationNumber}</td>
                      <td>{reservation.name}</td>
                      <td>{reservation.email}</td>
                      <td>{reservation.phone}</td>
                      <td>{reservation.guests}</td>
                      <td>{formatReservationTime(reservation.reservationTime)}</td>
                      <td>
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
            </div>
          </Card.Body>
        </Card>
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
        <div className="custom-date-picker-wrapper">
          <DatePicker
            selected={editFormData.reservationTime}
            onChange={handleEditDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd.MM.yyyy HH:mm"
            className="form-control"
            locale="nb"
          />
        </div>
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
