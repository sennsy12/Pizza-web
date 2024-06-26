// src/handlers/twilioHandler.js
const twilio = require('twilio');
const moment = require('moment');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendConfirmationSms = (to, confirmationNumber, reservationTime) => {
  // Format reservation time in the desired format
  const formattedTime = moment(reservationTime).format('DD.MM.YYYY, HH:mm');

  const message = `Your reservation is confirmed for ${formattedTime}. Your confirmation number is ${confirmationNumber}.`;

  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to,
  });
};

const sendTakeawaySMS = (to, message) => {
  return client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: to,
  });
};

module.exports = { sendConfirmationSms, sendTakeawaySMS };
