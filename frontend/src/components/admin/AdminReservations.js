import React, { useEffect, useState, forwardRef } from 'react';
import { fetchReservations, deleteReservation, updateReservation } from '../handlers/adminHandler';
import ReservationStatsCards from '../admin/ReservationStatsCards';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment-timezone';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import nb from 'date-fns/locale/nb';

registerLocale('nb', nb);
setDefaultLocale('nb');

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 cursor-pointer"
  >
    {value || 'Select date'}
  </div>
));

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('reservationTime');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', guests: 1, reservationTime: '' });
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1); 
    return date;
  });
  
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1); 
    return date;
  });
  

  useEffect(() => {
    loadReservations();
  }, [startDate, endDate]);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await fetchReservations();
      const filteredData = data.filter(reservation => {
        const reservationDate = new Date(reservation.reservationTime);
        return reservationDate >= startDate && reservationDate <= endDate;
      });
      setReservations(filteredData);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  

  const sortedReservations = [...reservations].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredReservations = sortedReservations.filter(
    (reservation) =>
      reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (reservation) => {
    setSelectedReservation(reservation);
    setShowConfirmModal(true);
  };
  
  const confirmDelete = async () => {
    if (selectedReservation) {
      try {
        const success = await deleteReservation(selectedReservation.confirmationNumber);
        if (success) {
          setReservations(prevReservations => 
            prevReservations.filter(res => res.confirmationNumber !== selectedReservation.confirmationNumber)
          );
        } else {
          console.error('Failed to delete reservation');
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      } finally {
        setShowConfirmModal(false);
        setSelectedReservation(null);
      }
    }
  };
  

  const formatReservationTime = (time) => {
    return moment(time).tz('Europe/Oslo').format('DD.MM.YYYY HH:mm');
  };

  const parseReservationTime = (time) => {
    return moment.tz(time, 'Europe/Oslo').toDate();
  };

  const handleEdit = (reservation) => {
    setEditFormData({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      guests: reservation.guests,
      reservationTime: parseReservationTime(reservation.reservationTime)
    });
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditDateChange = (date) => {
    setEditFormData(prevState => ({ ...prevState, reservationTime: date }));
  };

  const handleEditSubmit = async () => {
    if (selectedReservation) {
      try {
        const updatedReservationData = {
          ...editFormData,
          reservationTime: moment(editFormData.reservationTime).tz('Europe/Oslo').format(),
        };
        await updateReservation(selectedReservation.id, updatedReservationData);
        
        
        await loadReservations();
  
        
        setShowEditModal(false);
        setSelectedReservation(null);
        setEditFormData({ name: '', email: '', phone: '', guests: 1, reservationTime: '' });
      } catch (error) {
        console.error('Error updating reservation:', error);
      }
    }
  };
  
  

  return (
    <div className="min-h-screen bg-dark-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-4">All Reservations</h1>
          <ReservationStatsCards />
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-depth p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Date Pickers */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-700">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomInput />}
                locale="nb"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-700">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomInput />}
                locale="nb"
              />
            </div>

            {/* Search Input */}
            <div className="space-y-2 lg:col-span-2">
              <label className="block text-sm font-medium text-dark-700">Search</label>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-depth overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-50 border-b border-dark-200">
                  <tr>
                    {['confirmationNumber', 'name', 'email', 'phone', 'guests', 'reservationTime'].map((field) => (
                      <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="px-6 py-4 text-left text-sm font-medium text-dark-500 uppercase tracking-wider cursor-pointer hover:bg-dark-100"
                      >
                        <div className="flex items-center gap-1">
                          {field.replace(/([A-Z])/g, ' $1')}
                          {sortField === field && (
                            <span className="text-primary-500">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-4 text-left text-sm font-medium text-dark-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-100">
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-dark-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {reservation.confirmationNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {reservation.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {reservation.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {reservation.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {reservation.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-900">
                        {formatReservationTime(reservation.reservationTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(reservation)}
                            className="px-3 py-1 text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(reservation)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredReservations.length === 0 && (
          <div className="text-center p-8 bg-white rounded-xl shadow-depth">
            <p className="text-dark-500">No reservations found.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-depth w-full max-w-md">
              <div className="p-6 border-b border-dark-100">
                <h3 className="text-lg font-semibold text-dark-900">Confirm Deletion</h3>
              </div>
              <div className="p-6 text-dark-600">
                Are you sure you want to delete the reservation for {selectedReservation?.name} with phone number {selectedReservation?.phone}?
              </div>
              <div className="flex justify-end gap-3 p-6 bg-dark-50">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-dark-600 hover:text-dark-900 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-depth w-full max-w-md">
              <div className="p-6 border-b border-dark-100">
                <h3 className="text-lg font-semibold text-dark-900">Edit Reservation</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    readOnly
                    className="w-full px-4 py-2 border border-dark-300 rounded-lg bg-dark-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={editFormData.guests}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-700">Reservation Time</label>
                  <DatePicker
                    selected={editFormData.reservationTime}
                    onChange={handleEditDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd.MM.yyyy HH:mm"
                    customInput={<CustomInput />}
                    locale="nb"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 bg-dark-50">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-dark-600 hover:text-dark-900 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReservations;