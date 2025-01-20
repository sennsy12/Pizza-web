import React, { useEffect, useState } from 'react';
import { fetchReservationStats } from '../handlers/reservationHandler';
import { FaUsers, FaCalendarAlt, FaUserFriends, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="h-full"
  >
    <div className="bg-white rounded-xl shadow-depth p-6 h-full transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="p-3 bg-primary-50 rounded-full text-primary-500">
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <h3 className="text-lg font-medium text-dark-600 text-center">{title}</h3>
        <p className="text-3xl font-bold text-dark-900">{value}</p>
      </div>
    </div>
  </motion.div>
);

const ReservationStatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchReservationStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch reservation stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12 text-dark-400">
        No statistics available
      </div>
    );
  }

  const statCards = [
    { 
      title: 'Total Guests', 
      value: stats.totalGuests, 
      icon: <FaUsers className="text-primary-500" />
    },
    { 
      title: 'Total Reservations', 
      value: stats.totalReservations, 
      icon: <FaCalendarAlt className="text-green-500" />
    },
    { 
      title: 'Guests Today', 
      value: stats.guestsToday, 
      icon: <FaUserFriends className="text-blue-500" />
    },
    { 
      title: 'Reservations Today', 
      value: stats.reservationsToday, 
      icon: <FaCalendarAlt className="text-amber-500" />
    },
    { 
      title: 'Avg. Guests/Reservation', 
      value: (parseFloat(stats.averageGuestsPerReservation) || 0).toFixed(2), 
      icon: <FaUsers className="text-red-500" />
    },
    { 
      title: 'Latest Reservation', 
      value: new Date(stats.latestReservationToday).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      icon: <FaClock className="text-primary-500" />
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-8 px-4 sm:px-6">
      {statCards.map((card, index) => (
        <div key={index} className="h-full">
          <StatCard {...card} />
        </div>
      ))}
    </div>
  );
};

export default ReservationStatsCards;