const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser,refreshAccessToken} = require('../controllers/authController');
const { userRegistrationMiddleware, loginMiddleware,checkAuthToken } = require('../middleware');


// Register route with validation
router.post('/register',userRegistrationMiddleware,registerUser);

// Login route with validation
router.post('/login',loginMiddleware,loginUser);

// Logout
router.post('/logout',logoutUser);

// Genrate Refresh token
router.post('/generate-refresh-token',checkAuthToken, refreshAccessToken);


module.exports = router;
