// OrderSummary.js
import React from 'react';
import { Card, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { useQuantity } from '../../hooks/useQuantity';

const OrderSummary = ({ cart, totalPrice, removeFromCart, updateQuantity }) => {
  const { handleQuantityChange, validateQuantityChange } = useQuantity(updateQuantity);

  return (
    <Card className="border-0 shadow-sm rounded-lg">
      <Card.Header className="bg-primary text-white text-center">
        <h5>Your Order</h5>
      </Card.Header>
      <Card.Body className="p-4">
        {cart.length === 0 ? (
          <p className="text-muted text-center">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <Row key={item.id} className="align-items-center mb-3">
                <Col xs={6} className="d-flex flex-column">
                  <strong>{item.name}</strong>
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </Col>
                <Col xs={4} className="d-flex align-items-center">
                  <InputGroup size="sm">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      disabled={item.quantity <= 1}
                      onClick={() => validateQuantityChange(index, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <FormControl
                      className="text-center"
                      value={item.quantity}
                      readOnly
                      aria-label={`Quantity of ${item.name}`}
                      style={{ maxWidth: '50px' }}
                    />
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => validateQuantityChange(index, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </Col>
                <Col xs={2} className="text-end">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(index)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="rounded-circle p-2"
                  >
                    <Trash />
                  </Button>
                </Col>
              </Row>
            ))}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h6>Total:</h6>
              <h6>${totalPrice.toFixed(2)}</h6>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

OrderSummary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired
};

export default OrderSummary;
