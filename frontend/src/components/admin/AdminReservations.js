import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchReservations } from '../handlers/adminHandler';
const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      const data = await fetchReservations();
      setReservations(data);
    };
    loadReservations();
  }, []);


  return (
    <div>
      <h1>All Reservations</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.name}</td>
              <td>{reservation.email}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.guests}</td>
              <td>{new Date(reservation.reservationTime).toLocaleString()}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminReservations;
