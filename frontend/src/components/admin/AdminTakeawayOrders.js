import React, { useEffect, useState } from 'react';
import { BsInfoCircle, BsBox, BsClockHistory, BsXCircle, BsSearch, BsTrash, BsEye, 
         BsArrowUp, BsArrowDown, BsCalendar4, BsBarChart, BsTruck, BsCheckCircle } from 'react-icons/bs';
import moment from 'moment-timezone';
import { fetchTakeawayOrders, deleteTakeawayOrder } from '../handlers/adminHandler';

const AdminTakeawayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('pickup_time');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchTakeawayOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch takeaway orders:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter(
    (order) =>
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone.includes(searchTerm)
  );

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      const success = await deleteTakeawayOrder(orderToDelete.order_number, orderToDelete.customer_phone);
      if (success) {
        setOrders(orders.filter(order => order.id !== orderToDelete.id));
        handleCloseConfirmDelete();
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting takeaway order:', error);
    }
  };

  const handleOpenConfirmDelete = (order) => {
    setOrderToDelete(order);
    setShowConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setOrderToDelete(null);
  };

  // Mock activity log data
  const activityLog = [
    { timestamp: '2024-08-01 14:00:00', action: 'Order Created' },
    { timestamp: '2024-08-01 14:10:00', action: 'Order Confirmed' },
    { timestamp: '2024-08-01 14:30:00', action: 'Order Prepared' },
    { timestamp: '2024-08-01 14:45:00', action: 'Order Ready for Pickup' },
  ];

  // Function to aggregate items by name and calculate the total quantity
  const aggregateItems = (items) => {
    const aggregated = {};

    items.forEach(item => {
      if (aggregated[item.name]) {
        aggregated[item.name].quantity += item.quantity;
      } else {
        aggregated[item.name] = { ...item };
      }
    });

    return Object.values(aggregated);
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-white border-b pb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Takeaway Orders
          </h1>
          <p className="text-gray-600">
            Manage and track all takeaway orders efficiently
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-md">
              <BsBarChart className="h-5 w-5 text-gray-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Today</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">{orders.length}</h3>
          <p className="text-gray-600 text-sm">Total Orders</p>
          <div className="mt-4 flex items-center text-sm">
            <BsArrowUp className="text-green-600 mr-1" />
            <span className="text-green-600 font-medium">12%</span>
            <span className="text-gray-600 ml-1">vs last week</span>
          </div>
        </div>

        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-md">
              <BsCalendar4 className="h-5 w-5 text-gray-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Active</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
            {orders.filter(order => moment(order.created_at).isSame(moment(), 'day')).length}
          </h3>
          <p className="text-gray-600 text-sm">Today's Orders</p>
          <div className="mt-4 flex items-center text-sm">
            <BsCheckCircle className="text-gray-600 mr-1" />
            <span className="text-gray-600">Updated just now</span>
          </div>
        </div>

        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-md">
              <BsTruck className="h-5 w-5 text-gray-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Pending</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
            {orders.filter(order => !order.delivered).length}
          </h3>
          <p className="text-gray-600 text-sm">Pending Delivery</p>
          <div className="mt-4 flex items-center text-sm">
            <BsArrowDown className="text-gray-600 mr-1" />
            <span className="text-gray-600">3 orders remaining</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by customer name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white border rounded-lg text-gray-900 
                         focus:ring-2 focus:ring-gray-200 focus:border-gray-300"
            />
            <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
            <div className="absolute inset-3 rounded-full border-4 border-secondary-200 border-b-secondary-600 animate-spin-slow"></div>
          </div>
          <p className="mt-6 text-dark-400 animate-pulse">Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in">
          <div className="mx-auto w-24 h-24 text-primary-300 animate-float">
            <BsBox className="w-full h-full" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-dark-600">No Orders Found</h3>
          <p className="mt-2 text-dark-400">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200/50">
              <thead>
                <tr>
                  {[
                    { field: 'created_at', label: 'Order Time' },
                    { field: 'order_number', label: 'Order #' },
                    { field: 'customer_name', label: 'Customer' },
                    { field: 'customer_phone', label: 'Phone' },
                    { field: 'total_amount', label: 'Amount' },
                    { field: 'pickup_time', label: 'Pickup Time' },
                    { field: null, label: 'Actions' },
                  ].map((header) => (
                    <th
                      key={header.label}
                      onClick={() => header.field && handleSort(header.field)}
                      className={`table-header group ${header.field ? 'cursor-pointer' : ''}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{header.label}</span>
                        {header.field && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            {sortField === header.field ? (
                              sortDirection === 'asc' ? (
                                <BsArrowUp className="h-4 w-4 text-primary-500" />
                              ) : (
                                <BsArrowDown className="h-4 w-4 text-primary-500" />
                              )
                            ) : (
                              <BsArrowUp className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredOrders.map((order, index) => (
                  <tr 
                    key={order.id}
                    className="hover:bg-primary-50/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-dark-600">
                          {moment(order.created_at).format('MMM D, YYYY')}
                        </span>
                        <span className="text-xs text-dark-400">
                          {moment(order.created_at).format('h:mm A')}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-primary">
                        #{order.order_number}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                          <span className="text-primary-700 font-medium">
                            {order.customer_name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-dark-600">{order.customer_name}</span>
                      </div>
                    </td>
                    <td className="table-cell text-dark-400">{order.customer_phone}</td>
                    <td className="table-cell">
                      <span className="badge badge-secondary">
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium text-dark-600">
                          {moment(order.pickup_time).format('MMM D, YYYY')}
                        </span>
                        <span className="text-xs text-dark-400">
                          {moment(order.pickup_time).format('h:mm A')}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="btn-secondary inline-flex items-center text-sm px-3 py-1.5"
                        >
                          <BsEye className="mr-1.5 h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleOpenConfirmDelete(order)}
                          className="btn-secondary inline-flex items-center text-sm px-3 py-1.5 
                                   text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50/50"
                        >
                          <BsTrash className="mr-1.5 h-4 w-4" />
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

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              onClick={handleCloseModal}
              aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div 
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                  <button
                    onClick={handleCloseModal}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <BsXCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="px-6 py-4">
                  <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4">
                      {[
                        { id: 'details', icon: BsInfoCircle, label: 'Details' },
                        { id: 'items', icon: BsBox, label: 'Items' },
                        { id: 'activity', icon: BsClockHistory, label: 'Activity' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center px-4 py-2 font-medium text-sm rounded-md
                                    ${activeTab === tab.id
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                        >
                          <tab.icon className="h-5 w-5 mr-2" />
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="mt-4">
                    {activeTab === 'details' && (
                      <div className="space-y-4">
                        {[
                          { label: 'Order Number', value: selectedOrder.order_number },
                          { label: 'Customer', value: selectedOrder.customer_name },
                          { label: 'Phone', value: selectedOrder.customer_phone },
                          { 
                            label: 'Pickup Time',
                            value: moment(selectedOrder.pickup_time).format('MMM D, YYYY h:mm A')
                          },
                          {
                            label: 'Total Amount',
                            value: `$${parseFloat(selectedOrder.total_amount).toFixed(2)}`
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex justify-between p-4 rounded-md bg-gray-50"
                          >
                            <span className="text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'items' && (
                      <div className="space-y-4">
                        {aggregateItems(JSON.parse(selectedOrder.items_ordered)).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-md bg-gray-50"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-gray-100 rounded-md">
                                <BsBox className="h-5 w-5 text-gray-600" />
                              </div>
                              <span className="font-medium text-gray-900">{item.name}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="px-2.5 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-md">
                                Qty: {item.quantity}
                              </span>
                              <span className="px-2.5 py-1 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
                                ${parseFloat(item.price).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'activity' && (
                      <div className="relative">
                        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                        <div className="space-y-6">
                          {activityLog.map((log, index) => (
                            <div key={index} className="relative flex items-start ml-6">
                              <div className="absolute -left-3 mt-1.5">
                                <div className="h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-600"></div>
                              </div>
                              <div className="flex-1 rounded-md bg-gray-50 p-4">
                                <p className="font-medium text-gray-900">{log.action}</p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {moment(log.timestamp).format('MMM D, YYYY h:mm A')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500/75 transition-opacity"
              onClick={handleCloseConfirmDelete}
              aria-hidden="true"
            ></div>

            <div 
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-6 py-6">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <BsTrash className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">Delete Order</h3>
                  <p className="mt-2 text-gray-500">
                    Are you sure you want to delete this order? This action cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-center space-x-3">
                    <button
                      onClick={handleCloseConfirmDelete}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteOrder}
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTakeawayOrders;
