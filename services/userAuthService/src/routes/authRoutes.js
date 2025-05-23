const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const signupMiddleware = require('../middleware/userRegistrationMiddleware');

// Register route with validation
router.post('/register',signupMiddleware,registerUser);

// Login route with validation
router.post('/login',loginUser);



module.exports = router;
