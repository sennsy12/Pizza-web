import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Menu from './Menu';
import ReservationPage from './containers/reservationPage';
import ReservationPageConfirmation from './containers/reservationPageConfirmation';
import TakeawayPage from './containers/takeawayPage';
import Header from './assets/Header';
import Footer from './assets/Footer';

const MainComponent = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ paddingTop: '90px' }}> {/* Add padding to the top */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/confirmation" element={<ReservationPageConfirmation />} />
            <Route path="/takeaway" element={<TakeawayPage />} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainComponent;
