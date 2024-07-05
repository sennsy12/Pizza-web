import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import pizzaromaLogo from './pizzaromaLogo.png'; // Import the logo image

const StyledNavbar = styled(Navbar)`
  transition: all 0.3s ease;
  background-color: rgba(51, 51, 51, 0.8);
  height: 70px;
  
  &.navbar-scrolled {
    background-color: #ff6b6b !important;
  }

  .navbar-toggler {
    border: none;
    &:focus {
      box-shadow: none;
    }
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.85)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      background-color: rgba(51, 51, 51, 0.95);
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      padding: 1rem;
    }
  }
`;

const NavLink = styled(Nav.Link)`
  color: white !important;
  margin: 0 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 991px) {
    padding: 0.5rem 0;
  }
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const BrandText = styled.span`
  color: white;
  font-weight: bold;
`;

const Header = () => {
  const { isAuthenticated, logout } = useState();
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

  return (
    <StyledNavbar 
      expand="lg" 
      fixed="top" 
      variant="dark" 
      className={scrolled ? 'navbar-scrolled' : ''}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Logo src={pizzaromaLogo} alt="Pizzaroma Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink as={Link} to="/" onClick={() => setExpanded(false)}>Home</NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink as={Link} to="/menu" onClick={() => setExpanded(false)}>Menu</NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink as={Link} to="/reservation" onClick={() => setExpanded(false)}>Reservation</NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <NavLink as={Link} to="/takeaway" onClick={() => setExpanded(false)}>Takeaway</NavLink>
            </motion.div>
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <NavLink as={Link} to="/admin" onClick={() => setExpanded(false)}>Admin</NavLink>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button 
                    variant="outline-light" 
                    className="ms-lg-3 mt-2 mt-lg-0"
                    onClick={() => {
                      setExpanded(false);
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink as={Link} to="/login" onClick={() => setExpanded(false)}>Login</NavLink>
              </motion.div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Header;
