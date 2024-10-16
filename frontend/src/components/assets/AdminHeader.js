import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear user session or token
    navigate('/'); // Redirect to home page
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/admin">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/reservations">Reservations</Nav.Link>
            <Nav.Link as={Link} to="/admin/takeaway-orders">Takeaway Orders</Nav.Link>
            <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={() => setShowLogoutModal(true)}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
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
