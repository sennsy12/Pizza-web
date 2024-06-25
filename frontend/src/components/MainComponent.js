import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Menu from './Menu';
import ReservationPage from './containers/reservationPage';
import ReservationPageConfirmation from './containers/reservationPageConfirmation';
import Header from './assets/Header';
import Footer from './assets/Footer';
import { Container } from 'react-bootstrap';

const MainComponent = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ paddingTop: '90px' }}> {/* Add padding to the top */}
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/confirmation" element={<ReservationPageConfirmation />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainComponent;
