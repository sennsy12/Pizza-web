import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Container, Row, Col, Card } from 'react-bootstrap';
import { fetchAdvancedReservationStats } from '../handlers/reservationHandler';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

const AdvancedReservationStats = () => {
  const [startDate, setStartDate] = useState(() => {const date = new Date();date.setDate(date.getDate() - 2);return date;});
  const [endDate, setEndDate] = useState(() => {const date = new Date();date.setDate(date.getDate() + 2);return date;});
  const [guestCount, setGuestCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('guests');

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdvancedReservationStats({
        startDate,
        endDate,
        guestCount,
        phone: phone.trim() || undefined,
        viewType
      });

      if (result.success) {
        console.log("Data received:", result.data);
        const parsedData = result.data.map(item => ({
          ...item,
          date: formatDate(item.date),
          total: parseInt(item.total, 10)
        }));
        console.log("Parsed data:", parsedData);
        setData(parsedData);
      } else {
        setError(result.error || 'Failed to fetch stats');
        setData([]);
      }
    } catch (error) {
      console.error('Error in loadStats:', error);
      setError('An unexpected error occurred');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats(); 
  }, []); 

  return (
    <Container className="mt-4">
      <StyledCard>
        <Card.Header as="h2" className="text-center text-primary">Advanced Reservation Statistics</Card.Header>
        <Card.Body>
          <Form className="mb-4">
            <Row className="align-items-end">
              <Col xs={12} md={3} className="mb-2">
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3} className="mb-2">
                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2} className="mb-2">
                <Form.Group controlId="guestCount">
                  <Form.Label>Min Guests</Form.Label>
                  <Form.Control
                    type="number"
                    value={guestCount}
                    onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={2} className="mb-2">
                <Form.Group controlId="viewType">
                  <Form.Label>View Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={viewType}
                    onChange={e => setViewType(e.target.value)}
                  >
                    <option value="guests">Guests</option>
                    <option value="reservations">Reservations</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={2} className="mb-2">
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Optional"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-end mt-3">
              <Col xs="auto">
                <StyledButton 
                  onClick={loadStats} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" role="status" className="me-1" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    'Load Stats'
                  )}
                </StyledButton>
              </Col>
            </Row>
          </Form>

          {error && (
            <p className="text-center text-danger mt-4">{error}</p>
          )}

          {data.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
            <LineChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => value}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis 
                domain={[0, dataMax => Math.ceil(dataMax * 1.2)]}
                tickFormatter={value => Math.round(value)}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <CartesianGrid strokeDasharray="3 3" />
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#82ca9d" 
                name={viewType === 'guests' ? 'Total Guests' : 'Total Reservations'}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          )}

          {!loading && !error && data.length === 0 && (
            <p className="text-center mt-4">No data available. Please load stats.</p>
          )}

        </Card.Body>
      </StyledCard>
    </Container>
  );
};

export default AdvancedReservationStats;