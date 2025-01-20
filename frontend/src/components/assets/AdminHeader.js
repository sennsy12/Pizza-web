import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUtensils, faTachometerAlt, faSignOutAlt, faChartArea, faBars, faX } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { to: '/admin', icon: faTachometerAlt, text: 'Dashboard' },
    { to: '/admin/takeaway-orders', icon: faUtensils, text: 'Takeaway Orders' },
    { to: '/admin/reservations', icon: faCalendarAlt, text: 'Reservations' },
    { to: '/admin/advanced-reservation-stats', icon: faChartArea, text: 'Statistics' },
    { to: '/admin/AdminMenu', icon: faUtensils, text: 'Menu' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <Link 
                to="/admin" 
                className="text-primary-500 text-xl font-bold tracking-tight transition-colors hover:text-primary-600"
              >
                Admin Panel
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-dark-600 hover:bg-dark-50 hover:text-dark-900'
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-2 w-4 h-4" />
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Logout and mobile menu button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-dark-500 hover:text-dark-900 hover:bg-dark-100 focus:outline-none"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={isMobileMenuOpen ? faX : faBars} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-dark-100">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-dark-600 hover:bg-dark-50 hover:text-dark-900'
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon} className="mr-3 w-4 h-4" />
                  {link.text}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowLogoutModal(true);
                }}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-dark-900 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-depth max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-dark-100">
              <h3 className="text-lg font-semibold text-dark-900">Confirm Logout</h3>
            </div>
            
            <div className="p-6 text-dark-600">
              Are you sure you want to log out?
            </div>

            <div className="flex justify-end gap-3 p-6 bg-dark-50">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-dark-600 hover:text-dark-900 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleLogout(); setShowLogoutModal(false); }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;