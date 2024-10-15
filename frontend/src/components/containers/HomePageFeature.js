import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice, FaLeaf, FaWineGlassAlt, FaUtensils, FaTruck, FaUsers } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  background: rgba(255, 107, 107, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 215, 255, 0.2);
  transition: all 0.3s ease;
  height: 100%;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
`;

const FeatureText = styled(Card.Text)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
`;

const ExpandedContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

const FeatureSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const features = [
    {
      icon: <FaPizzaSlice />,
      title: "Authentic Wood-Fired Pizzas",
      description: "Experience the crispy, smoky perfection of our traditional wood-fired pizzas.",
      expanded: "Our pizzas are baked in a custom-built wood-fired oven, reaching temperatures of up to 900°F for that perfect crispy crust and smoky flavor."
    },
    {
      icon: <FaLeaf />,
      title: "Fresh, Local Ingredients",
      description: "We source the finest local ingredients to ensure unmatched quality and flavor.",
      expanded: "We partner with local farms to bring you the freshest, seasonal ingredients. Our menu changes regularly to showcase the best produce available."
    },
    {
      icon: <FaWineGlassAlt />,
      title: "Cozy Dining Experience",
      description: "Enjoy your meal in our warm, inviting atmosphere with a curated wine selection.",
      expanded: "Our sommelier has carefully curated a wine list to perfectly complement our pizzas, featuring both local and international selections."
    },
    {
      icon: <FaUtensils />,
      title: "Diverse Menu Options",
      description: "From classic Margherita to gourmet specialties, we have something for everyone.",
      expanded: "Our menu includes vegetarian, vegan, and gluten-free options. We also offer custom pizzas where you can choose your own toppings."
    },
    {
      icon: <FaTruck />,
      title: "Fast & Reliable Delivery",
      description: "Can't dine in? Enjoy our pizzas in the comfort of your home with our delivery service.",
      expanded: "We use state-of-the-art thermal bags to ensure your pizza arrives hot and fresh. Track your order in real-time through our mobile app."
    },
    {
      icon: <FaUsers />,
      title: "Community Focused",
      description: "We're more than just a pizzeria - we're a part of the community.",
      expanded: "We regularly host community events, support local charities, and offer pizza-making classes for kids and adults alike."
    },
  ];

  return (
    <Container fluid className="py-5" style={{ borderRadius: '20px', background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.85), rgba(255, 142, 83, 0.85))' }}>
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <Card.Body className="text-center p-4">
                  <IconWrapper>{feature.icon}</IconWrapper>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.description}</FeatureText>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <ExpandedContent
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FeatureText>{feature.expanded}</FeatureText>
                      </ExpandedContent>
                    )}
                  </AnimatePresence>
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