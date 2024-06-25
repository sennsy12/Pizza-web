// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <Container>
        <Row>
          <Col className="py-1">
            <div className="text-center p-3">
              © 2024 Pizza Web
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
