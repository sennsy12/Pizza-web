// src/containers/HomePageFeature.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPizzaSlice, FaLeaf, FaWineGlassAlt } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px 0 rgba(31, 38, 135, 0.5);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const FeatureSection = () => {
  const features = [
    {
      icon: <FaPizzaSlice />,
      title: "Authentic Wood-Fired Pizzas",
      description: "Experience the crispy, smoky perfection of our traditional wood-fired pizzas.",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh, Local Ingredients",
      description: "We source the finest local ingredients to ensure unmatched quality and flavor.",
    },
    {
      icon: <FaWineGlassAlt />,
      title: "Cozy Dining Experience",
      description: "Enjoy your meal in our warm, inviting atmosphere with a curated wine selection.",
    },
  ];

  return (
    <Container fluid className="py-5" style={{ background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }}>
      <Container className="py-5"> {/* Added padding here */}
        <motion.h2 
          className="text-center mb-5 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Our Pizzeria?
        </motion.h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={4} key={index}>
              <StyledCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card.Body className="text-center p-4">
                  <IconWrapper>{feature.icon}</IconWrapper>
                  <Card.Title className="mb-3 text-white">{feature.title}</Card.Title>
                  <Card.Text className="text-white-50">{feature.description}</Card.Text>
                </Card.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default FeatureSection;
