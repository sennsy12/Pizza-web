import React, { useState } from 'react';
import { Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, ShieldLock } from 'react-bootstrap-icons';

const Payment = ({ totalPrice }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [validated, setValidated] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Luhn Algorithm for card number validation
  const isValidCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/');
    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!isValidCardNumber(cardNumber.replace(/\s/g, ''))) {
      setError('Invalid card number');
      return;
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setError('');
      setProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Payment processed successfully!');
      setProcessing(false);
    }
    setValidated(true);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Enter your card details securely.
    </Tooltip>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h2 className="mb-4">Payment</h2>
      <p>Total to pay: kr {totalPrice}</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCardNumber">
          <Form.Label>
            Card Number <CreditCard />
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            isInvalid={!!error && !isValidCardNumber(cardNumber.replace(/\s/g, ''))}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid card number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formExpiryDate">
          <Form.Label>
            Expiration Date <Calendar />
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid expiration date.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCvv">
          <Form.Label>
            CVV <ShieldLock />
          </Form.Label>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <Form.Control
              type="text"
              placeholder="123"
              value={cvv}
              onChange={handleCvvChange}
              required
            />
          </OverlayTrigger>
          <Form.Control.Feedback type="invalid">
            Please enter a valid CVV.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={processing}>
          {processing ? <Spinner animation="border" size="sm" /> : `Pay kr ${totalPrice}`}
        </Button>
      </Form>
    </motion.div>
  );
};

export default Payment;
