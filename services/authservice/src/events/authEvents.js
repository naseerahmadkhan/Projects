// src/events/authEvents.js
const eventEmitter = require('./eventEmitter');

eventEmitter.on('userRegistered', (user) => {
  console.log('User registered:', user.email);
  // You can trigger email verification or logging here
});

eventEmitter.on('userLoggedIn', (user) => {
  console.log('User logged in:', user.email);
});
