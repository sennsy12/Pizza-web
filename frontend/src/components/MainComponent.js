// src/components/MainComponent.js
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
      <Container className="flex-grow-1 mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/confirmation" element={<ReservationPageConfirmation />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default MainComponent;
