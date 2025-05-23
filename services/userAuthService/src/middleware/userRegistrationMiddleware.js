const { validateRegistration, checkValidation } = require('../validators/userValidator');

const userRegistrationMiddleware = [
  validateRegistration,
  checkValidation,
];

module.exports = userRegistrationMiddleware;
