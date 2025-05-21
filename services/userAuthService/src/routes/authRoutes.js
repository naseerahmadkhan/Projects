const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken } = require('../controllers/authController');

// Register route with validation
router.post('/register',registerUser);


module.exports = router;
