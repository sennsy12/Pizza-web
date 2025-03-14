import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FeatureSection from '../containers/HomePageFeature'; // Import the FeatureSection component

const HomePage = () => {
  return (
    <Container fluid className="p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div 
          className="hero-section position-relative" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '90vh',
            borderRadius: '20px', // Rounded corners
            overflow: 'hidden',    // Ensures the rounded corners apply to the image
            backgroundColor: '#f8f9fa' // Light gray background color
          }}
        >
          <Container className="h-100 d-flex align-items-center">
            <Row className="w-100">
              <Col md={8} className="text-white">
                <motion.h1 
                  className="display-3 fw-bold mb-4"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Savor the Flavor of Perfection
                </motion.h1>
                <motion.p 
                  className="lead mb-5"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Experience the art of pizza-making with our handcrafted, wood-fired pizzas. 
                  Made with love, served with passion.
                </motion.p>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button 
                    as={Link} 
                    to="/menu" 
                    size="md" 
                    className="me-3 mb-3"
                    style={{ 
                      backgroundColor: '#4A5D4F',
                      borderColor: '#4A5D4F',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '8px 20px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#4A5D4F'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4A5D4F'}
                  >
                    View Menu
                  </Button>
                  <Button 
                    as={Link} 
                    to="/takeaway" 
                    size="md" 
                    className="me-3 mb-3"
                    style={{ 
                      backgroundColor: '#8B0000', 
                      borderColor: '#8B0000',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '8px 20px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#6B0000'} 
                    onMouseOut={(e) => e.target.style.backgroundColor = '#8B0000'}
                  >
                    Order Takeaway
                  </Button>
                  <Button 
                    as={Link} 
                    to="/reservation" 
                    size="md" 
                    className="mb-3"
                    style={{ 
                      backgroundColor: 'white', 
                      borderColor: 'white',
                      color: '#000',
                      borderRadius: '20px',
                      padding: '8px 20px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f8f9fa';
                      e.target.style.borderColor = '#f8f9fa';
                    }} 
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = 'white';
                    }}
                  >
                    Book a Table
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
      </motion.div>
      <Container className="mt-3 mb-5">
        <FeatureSection /> 
      </Container>
    </Container>
  );
};

export default HomePage;
