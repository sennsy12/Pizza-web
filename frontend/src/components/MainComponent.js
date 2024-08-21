import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import Menu from './Menu';
import ReservationPage from './containers/reservationPage';
import ReservationPageConfirmation from './containers/reservationPageConfirmation';
import TakeawayPage from './containers/takeawayPage';
import TakeawayPageConfirmation from './containers/takeawaypageConfirmation';
import Header from './assets/Header';
import Footer from './assets/Footer';
import AdminDashboard from './admin/AdminDashboard';
import AdminReservations from './admin/AdminReservations';
import AdminTakeawayOrders from './admin/AdminTakeawayOrders';
import LoginPage from './containers/LoginPage'; // Create this for authentication

const MainComponent = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1" style={{ paddingTop: '60px' }}>
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/confirmation" element={<ReservationPageConfirmation />} />
            <Route path="/takeaway" element={<TakeawayPage />} />
            <Route path="/takeawaypageConfirmation" element={<TakeawayPageConfirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/takeaway-orders" element={<AdminTakeawayOrders />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainComponent;
