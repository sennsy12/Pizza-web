import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUtensils, faTachometerAlt, faSignOutAlt, faChartArea } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin" className="fw-bold text-primary">
            Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin" className="mx-2 text-dark">
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/takeaway-orders" className="mx-2 text-dark">
                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                Takeaway Orders
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/reservations" className="mx-2 text-dark">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Reservations
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/advanced-reservation-stats" className="mx-2 text-dark">
              <FontAwesomeIcon icon={faChartArea} className="me-2" />
              Statistics
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/AdminMenu" className="mx-2 text-dark">
                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                Menu
              </Nav.Link>
            </Nav>
            <Button 
              variant="outline-danger" 
              onClick={() => setShowLogoutModal(true)}
              className="d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-danger">Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { handleLogout(); setShowLogoutModal(false); }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminHeader;