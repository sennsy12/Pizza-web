import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Badge, Spinner, Modal } from 'react-bootstrap';
import { fetchTakeawayOrders } from '../handlers/adminHandler';

const AdminTakeawayOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('pickup_time');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
            <>
              <p><strong>Order Number:</strong> {selectedOrder.order_number}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
              <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
              <p><strong>Pickup Time:</strong> {new Date(selectedOrder.pickup_time).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
              <h5>Ordered Items:</h5>
              <ul>
                {JSON.parse(selectedOrder.items_ordered).map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity} - Price: ${parseFloat(item.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminTakeawayOrders;
