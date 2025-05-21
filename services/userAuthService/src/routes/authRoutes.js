const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken, refreshAccessToken } = require('../controllers/authController');

// Register route with validation
router.post('/register',registerUser);

// Login route with validation
router.post('/login',loginUser);

// Refresh token route
router.post('/get-refresh-token', refreshAccessToken);


module.exports = router;
