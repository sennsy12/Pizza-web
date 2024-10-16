import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Menu from './Menu';
import ReservationPage from './containers/reservationPage';
import ReservationPageConfirmation from './containers/reservationPageConfirmation';
import TakeawayPage from './containers/takeawayPage';
import TakeawayPageConfirmation from './containers/takeawaypageConfirmation';
import Header from './assets/Header';
import AdminHeader from './assets/AdminHeader'; 
import Footer from './assets/Footer';
import AdminDashboard from './admin/AdminDashboard';
import AdminReservations from './admin/AdminReservations';
import AdminTakeawayOrders from './admin/AdminTakeawayOrders';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './PrivateRoute';  // Import PrivateRoute
import ProfilePage from './containers/ProfilePage'; 

const MainComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);  
  const location = useLocation();

  useEffect(() => {
    const isAdminPath = location.pathname.startsWith('/admin');
    setIsAdmin(isAdminPath);  
  }, [location]);  

  return (
    <div className="d-flex flex-column min-vh-100">
      {isAdmin ? <AdminHeader /> : <Header />}
      <main className="flex-grow-1" style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/confirmation" element={<ReservationPageConfirmation />} />
          <Route path="/takeaway" element={<TakeawayPage />} />
          <Route path="/takeawaypageConfirmation" element={<TakeawayPageConfirmation />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          {/* Protected admin routes */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/reservations" element={<PrivateRoute><AdminReservations /></PrivateRoute>} />
          <Route path="/admin/takeaway-orders" element={<PrivateRoute><AdminTakeawayOrders /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default MainComponent;
