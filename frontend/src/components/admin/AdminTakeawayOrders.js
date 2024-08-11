import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Spinner, Modal, Tab, Nav } from 'react-bootstrap';
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
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-primary">All Takeaway Orders</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by customer name or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort('order_number')}>Order Number</th>
              <th onClick={() => handleSort('customer_name')}>Customer Name</th>
              <th>Phone</th>
              <th onClick={() => handleSort('total_amount')}>Total Amount</th>
              <th onClick={() => handleSort('pickup_time')}>Pickup Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.customer_name}</td>
                <td>{order.customer_phone}</td>
                <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                <td>{new Date(order.pickup_time).toLocaleString()}</td>
                <td>
                  <Button variant="outline-primary" size="sm" onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                  <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleOpenConfirmDelete(order)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!loading && filteredOrders.length === 0 && (
        <p className="text-center">No takeaway orders found.</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Tab.Container defaultActiveKey="details">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="details">Order Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="items">Items Ordered</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="activity">Activity Log</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="details">
                  <p><strong>Order Number:</strong> {selectedOrder.order_number}</p>
                  <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                  <p><strong>Pickup Time:</strong> {new Date(selectedOrder.pickup_time).toLocaleString()}</p>
                  <p><strong>Total Amount:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="items">
                  <h5>Ordered Items:</h5>
                  <ul className="list-group">
                    {aggregateItems(JSON.parse(selectedOrder.items_ordered)).map((item, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name}</span>
                      <span className="badge bg-primary rounded-pill">Quantity: {item.quantity}</span>
                      <span className="badge bg-secondary rounded-pill">Price: ${parseFloat(item.price).toFixed(2)}</span>
                    </li>
                    ))}
                  </ul>
                </Tab.Pane>
                <Tab.Pane eventKey="activity">
                  <h5>Activity Log:</h5>
                  <ul>
                    {activityLog.map((log, index) => (
                      <li key={index}>
                        <strong>{log.timestamp}:</strong> {log.action}
                      </li>
                    ))}
                  </ul>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this takeaway order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminTakeawayOrders;
