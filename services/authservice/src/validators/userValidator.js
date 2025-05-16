const { body, validationResult } = require('express-validator');

// Validation for user registration
const validateRegistration = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
  body('name').notEmpty().withMessage('Name is required'),
];

// Validation for user login
const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Check validation result
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRegistration, validateLogin, checkValidation };
