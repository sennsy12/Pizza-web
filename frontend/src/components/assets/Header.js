import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import pizzaromaLogo from './pizzaromaLogo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navbarStyle = {
    backgroundColor: scrolled ? 'rgb(244, 151, 148)' : '#343a40',
    transition: 'all 0.3s ease',
    boxShadow: scrolled ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
  };

  const navLinkStyle = {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    margin: '0 0.2rem',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant="dark"
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      className="py-2"
      style={navbarStyle}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img
            src={pizzaromaLogo}
            alt="Pizzaroma Logo"
            height="40"
            className="me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {['Home', 'Menu', 'Reservation', 'Takeaway'].map((text) => (
              <motion.div key={text} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link 
                  as={Link} 
                  to={`/${text.toLowerCase()}`} 
                  onClick={() => setExpanded(false)}
                  style={navLinkStyle}
                  className="nav-link-hover"
                >
                  {text}
                </Nav.Link>
              </motion.div>
            ))}
            {false ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Nav.Link as={Link} to="/admin" onClick={() => setExpanded(false)} style={navLinkStyle}>
                    Admin
                  </Nav.Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline-light"
                    className="ms-lg-3 mt-2 mt-lg-0"
                    onClick={() => {
                      setExpanded(false);
                      // logout() function here
                    }}
                  >
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)} style={navLinkStyle}>
                  Login
                </Nav.Link>
              </motion.div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;