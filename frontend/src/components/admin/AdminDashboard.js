import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaShoppingBag } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-dark-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-900 text-center mb-8 animate-slide-down">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Reservations Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="p-6 lg:p-8 h-full flex flex-col">
              <div className="flex flex-col items-center mb-4">
                <div className="text-primary-500 mb-4 transition-colors group-hover:text-primary-600">
                  <FaCalendarAlt className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-semibold text-dark-900 mb-2">
                  Reservations
                </h2>
                <p className="text-dark-600 text-center mb-6">
                  View and manage customer reservations. Keep track of bookings and update reservation statuses.
                </p>
              </div>
              <Link
                to="/admin/reservations"
                className="mt-auto bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Manage Reservations
              </Link>
            </div>
          </div>

          {/* Takeaway Orders Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
            <div className="p-6 lg:p-8 h-full flex flex-col">
              <div className="flex flex-col items-center mb-4">
                <div className="text-primary-500 mb-4 transition-colors group-hover:text-primary-600">
                  <FaShoppingBag className="w-12 h-12" />
                </div>
                <h2 className="text-xl font-semibold text-dark-900 mb-2">
                  Takeaway Orders
                </h2>
                <p className="text-dark-600 text-center mb-6">
                  Monitor and process takeaway orders. Ensure timely preparation and pickup of customer orders.
                </p>
              </div>
              <Link
                to="/admin/takeaway-orders"
                className="mt-auto bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Manage Takeaway Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;