const { body, validationResult } = require('express-validator');

// Validation for user registration
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),

  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),

  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('isBlocked')
    .optional()
    .isBoolean()
    .withMessage('isBlocked must be a boolean'),

  body('lastLogin')
    .optional()
    .isArray()
    .withMessage('lastLogin must be an array of dates')
    .custom((arr) => arr.every(date => !isNaN(Date.parse(date))))
    .withMessage('Each entry in lastLogin must be a valid date'),

  body('changedPasswords')
    .optional()
    .isArray()
    .withMessage('changedPasswords must be an array of strings')
    .custom((arr) => arr.every(pw => typeof pw === 'string'))
    .withMessage('Each entry in changedPasswords must be a string'),
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
