import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPizzaSlice, FaLeaf, FaWineGlassAlt } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  background: rgba(255, 107, 107, 0.15); /* #ff6b6b with slight transparency */
  backdrop-filter: blur(12px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 215, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #fff; /* White color for the icons */
  margin-bottom: 1rem;
`;

const FeatureTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff; /* White color for the title */
`;

const FeatureText = styled(Card.Text)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85); /* Slightly lighter white for the text */
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
    <Container fluid className="py-5" style={{ borderRadius: '20px', background: 'rgba(255, 107, 107, 0.85)' }}>
      <Container className="py-5">
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
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.description}</FeatureText>
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
