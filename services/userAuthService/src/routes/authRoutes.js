const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser} = require('../controllers/authController');
const { userRegistrationMiddleware, loginMiddleware } = require('../middleware');


// Register route with validation
router.post('/register',userRegistrationMiddleware,registerUser);

// Login route with validation
router.post('/login',loginMiddleware,loginUser);

// Logout
router.post('/logout',logoutUser);


module.exports = router;
