const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

module.exports = client;

// client.messages
//     .create({
//         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//         from: process.env.TWILIO_PHONE,
//         to: '+919506846608'
//     })
//     .then(message => console.log(message.sid));