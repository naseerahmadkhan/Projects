const { validateLogin, checkValidation } = require('../validators/userValidator');

const loginMiddleware = [
    validateLogin,
  checkValidation,
];

module.exports = loginMiddleware;
