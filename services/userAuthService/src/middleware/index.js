const userRegistrationMiddleware = require('./userRegistrationMiddleware');
const loginMiddleware = require('./loginMiddleware');
const checkAuthToken = require('./checkAuthToken');

module.exports = {
  userRegistrationMiddleware,
  loginMiddleware,
  checkAuthToken
};
