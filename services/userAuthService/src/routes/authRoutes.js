const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const middleware = require('../middleware');



// Register route with validation
router.post('/register',middleware.validateRegistration,authController.registerUser);

// Login route with validation
router.post('/login',middleware.validateLogin,authController.loginUser);

// Logout
router.post('/logout',authController.logoutUser);

// refresh access token + rotate refresh token
router.post('/refresh',middleware.parseToken, authController.rotateRefreshToken);

// refresh access token
router.post('/refresh-access-token',middleware.parseToken, authController.refreshAccessToken);

// verify otp
router.post('/verify-otp',authController.verifyOtp)


module.exports = router;
