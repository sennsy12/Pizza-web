import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchTakeawayOrders } from '../handlers/adminHandler';

const AdminTakeawayOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchTakeawayOrders();
      setOrders(data);
    };
    loadOrders();
  }, []);

  return (
    <div>
      <h1>All Takeaway Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Pickup Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.customerPhone}</td>
              <td>
                {Array.isArray(order.itemsOrdered) ? (
                  order.itemsOrdered.map((item, index) => (
                    <div key={index}>{item.name} (x{item.quantity})</div>
                  ))
                ) : (
                  <div>No items</div>
                )}
              </td>
              <td>${order.totalAmount}</td>
              <td>{new Date(order.pickupTime).toLocaleString()}</td>
              <td>
                <Button variant="primary">Action</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminTakeawayOrders;
