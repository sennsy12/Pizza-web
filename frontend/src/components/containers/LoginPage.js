import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { loginUser} from '../handlers/authHandler';

const StyledCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        const success = await loginUser(email, password, rememberMe);
        if (success) {
          navigate('/admin');
        } else {
          setError('Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
      }
    };



  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <StyledCard>
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </Form.Group>

                <StyledButton variant="primary" type="submit">
                  Login
                </StyledButton>
              </Form>
              <div className="text-center mt-3">
                <a href="/forgot-password">Forgot password?</a>
                <br />
                <a href="/register">Don't have an account? Register</a>
              </div>
            </Card.Body>
          </StyledCard>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
