import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Menu from './containers/Menu';
import ReservationPage from './pages/reservationPage';
import ReservationPageConfirmation from './confirmations/reservationPageConfirmation';
import TakeawayPage from './pages/takeawayPage';
import TakeawayPageConfirmation from './confirmations/takeawaypageConfirmation';
import Header from './assets/Header';
import AdminHeader from './assets/AdminHeader'; 
import ProfileHeader from './assets/ProfileHeader'; 
import Footer from './assets/Footer';
import AdminDashboard from './admin/AdminDashboard';
import AdminReservations from './admin/AdminReservations';
import AdminTakeawayOrders from './admin/AdminTakeawayOrders';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from '../hooks/PrivateRoute';  
import ProfilePage from './pages/ProfilePage'; 
import SupportWidget from './containers/SupportChat';
import AdminMenu from './admin/AdminMenu';

const MainComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);  
  const [isUser, setIsUser] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('role');
    const isAdminPath = location.pathname.startsWith('/admin');
    
    setIsAdmin(role === 'admin' && isAdminPath);  
    setIsUser(role === 'user' && !isAdminPath);   
  }, [location]);  

  return (
    <div className="d-flex flex-column min-vh-100">
      {isAdmin ? <AdminHeader /> : (isUser ? <ProfileHeader /> : <Header />)}
      <main className="flex-grow-1" style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/confirmation" element={<ReservationPageConfirmation />} />
          <Route path="/takeaway" element={<TakeawayPage />} />
          <Route path="/takeawaypageConfirmation" element={<TakeawayPageConfirmation />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={
            <PrivateRoute allowedRoles={['user']}>
              <ProfilePage />
            </PrivateRoute>
          } />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/reservations" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminReservations />
            </PrivateRoute>
          } />
          <Route path="/admin/takeaway-orders" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminTakeawayOrders />
            </PrivateRoute>
          } />
          <Route path="/admin/AdminMenu" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminMenu />
            </PrivateRoute>
          } />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
      {!isAdmin && <SupportWidget />}
    </div>
  );
};

export default MainComponent;
