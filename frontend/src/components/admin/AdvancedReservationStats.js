import React, { useState, useEffect } from 'react';
import { fetchAdvancedReservationStats } from '../handlers/reservationHandler';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const colors = {
  primary: {
    500: '#943E3C',
    600: '#7A3230'
  },
  dark: {
    200: '#E2E8F0',
    500: '#64748B'
  },
  white: '#FFFFFF'
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

const AdvancedReservationStats = () => {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return date;
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  });
  const [guestCount, setGuestCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState('guests');

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdvancedReservationStats({
        startDate,
        endDate,
        guestCount,
        phone: phone.trim() || undefined,
        viewType
      });

      if (result.success) {
        const parsedData = result.data.map(item => ({
          ...item,
          date: formatDate(item.date),
          total: parseInt(item.total, 10)
        }));
        setData(parsedData);
      } else {
        setError(result.error || 'Failed to fetch stats');
        setData([]);
      }
    } catch (error) {
      console.error('Error in loadStats:', error);
      setError('An unexpected error occurred');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-dark-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-depth p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-dark-900 text-center mb-8 border-b border-dark-100 pb-4">
            Advanced Reservation Statistics
          </h2>

          <div className="space-y-8">
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-700">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-700">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-700">Min Guests</label>
                <input
                  type="number"
                  value={guestCount}
                  onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-700">View Type</label>
                <select
                  value={viewType}
                  onChange={e => setViewType(e.target.value)}
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="guests">Guests</option>
                  <option value="reservations">Reservations</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-dark-700">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-dark-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex justify-end">
              <button
                onClick={loadStats}
                disabled={loading}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin-slow" />
                    Loading...
                  </>
                ) : (
                  'Load Stats'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error-100 text-error-700 rounded-lg animate-fade-in">
                {error}
              </div>
            )}

            {/* Chart */}
            {data.length > 0 ? (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.dark[200]} />
                    <XAxis
                      dataKey="date"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      stroke={colors.dark[500]}
                    />
                    <YAxis
                      domain={[0, dataMax => Math.ceil(dataMax * 1.2)]}
                      stroke={colors.dark[500]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.dark[200]}`,
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      wrapperStyle={{ paddingBottom: '20px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={colors.primary[500]}
                      name={viewType === 'guests' ? 'Total Guests' : 'Total Reservations'}
                      strokeWidth={2}
                      dot={{ r: 4, fill: colors.primary[500] }}
                      activeDot={{ r: 6, fill: colors.primary[600] }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              !loading && !error && (
                <div className="text-center p-6 bg-dark-50 rounded-lg text-dark-500">
                  No data available. Please load stats.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedReservationStats;