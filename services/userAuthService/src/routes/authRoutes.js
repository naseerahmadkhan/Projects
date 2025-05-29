const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser,refreshAccessToken,rotateRefreshToken} = require('../controllers/authController');
const { userRegistrationMiddleware, loginMiddleware,checkAuthToken } = require('../middleware');


// Register route with validation
router.post('/register',userRegistrationMiddleware,registerUser);

// Login route with validation
router.post('/login',loginMiddleware,loginUser);

// Logout
router.post('/logout',logoutUser);

// refresh access token + rotate refresh token
router.post('/refresh',checkAuthToken, rotateRefreshToken);

// refresh access token
router.post('/refresh-access-token',checkAuthToken, refreshAccessToken);


module.exports = router;
