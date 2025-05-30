const {validateLogin,validateRegistration} = require('./authMiddleware')
const parseToken = require('./parseToken');

module.exports = {
  validateLogin,
  validateRegistration,
  parseToken
};
