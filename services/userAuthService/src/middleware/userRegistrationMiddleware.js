const { validateRegistration, checkValidation } = require('../validators/userValidator');
const { registerUser } = require('../controllers/authController');

const signupMiddleware = [
  validateRegistration,
  checkValidation,
  registerUser
];

module.exports = signupMiddleware;
