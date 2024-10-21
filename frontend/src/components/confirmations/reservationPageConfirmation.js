import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaCheckCircle, FaEnvelope, FaPhone, FaUser, FaUsers, FaClock } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 59.500111, // Latitude for the specified location
  lng: 10.258667 // Longitude for the specified location
};

const ReservationPageConfirmation = () => {
  const location = useLocation();
  const { reservation } = location.state;

  // Check if the google.maps object is available
  const markerIcon = window.google ? {
    url: 'https://maps.google.com/mapfiles/kml/paddle/red-circle.png', // URL to the custom icon
    scaledSize: new window.google.maps.Size(40, 40) // Scaled size of the icon
  } : null;

  return (
    <Container className="py-5">
      <Card className="shadow-lg rounded">
        <Card.Header className="bg-primary text-light text-center py-4">
          <h3><FaCheckCircle className="me-2" />Reservation Confirmation</h3>
        </Card.Header>
        <Card.Body className="bg-light">
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h4 className="mb-4 mt-2">Reservation Details</h4>
              <p className="mb-2"><FaUser className="me-2" /><strong>Name:</strong> {reservation.name} {reservation.lastName}</p>
              <p className="mb-2"><FaEnvelope className="me-2" /><strong>Email:</strong> {reservation.email}</p>
              <p className="mb-2"><FaPhone className="me-2" /><strong>Phone:</strong> {reservation.phone}</p>
              <p className="mb-2"><FaUsers className="me-2" /><strong>Number of Guests:</strong> {reservation.guests}</p>
              <p className="mb-4"><FaClock className="me-2" /><strong>Reservation Time:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
              <p className="mt-4">
                Thank you for choosing us! We look forward to welcoming you.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col md={8}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  {markerIcon && <Marker position={center} icon={markerIcon} />} {/* Custom marker icon */}
                </GoogleMap>
              </LoadScript>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReservationPageConfirmation;
