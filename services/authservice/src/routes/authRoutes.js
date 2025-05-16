const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken } = require('../controllers/authController');
const { validateRegistration, validateLogin, checkValidation } = require('../validators/userValidator');

// Register route with validation
router.post('/register', validateRegistration, checkValidation, registerUser);

// Login route with validation
router.post('/login', validateLogin, checkValidation, loginUser);

// Logout route (no validation needed)
router.post('/logout', logoutUser);

// Get user profile route
router.get('/me', getUserProfile);

// JWT Token Verification route
router.post('/verify-token', verifyJwtToken);  // New endpoint to verify JWT token

module.exports = router;
