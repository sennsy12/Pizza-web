import React from 'react';
import { Card, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const OrderSummary = ({ cart, totalPrice, removeFromCart, updateQuantity }) => {

  const handleQuantityChange = (index, newQuantity) => {
    updateQuantity(index, newQuantity);
  };

  return (
    <Card className="border-0 rounded-lg">
      <Card.Body className="p-4">
        <h4 className="text-center mb-4">Your Order</h4>
        {cart.length === 0 ? (
          <p className="text-muted text-center">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span>{item.name}</span>
                  <br />
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </div>
                <div className="d-flex align-items-center">
                  <InputGroup size="sm" className="mb-2 me-3">
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <FormControl
                      className="text-center"
                      value={item.quantity}
                      readOnly
                      style={{ maxWidth: '40px' }}
                    />
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeFromCart(index)}
                    className="rounded-circle p-1"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <strong>Total:</strong>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderSummary;
