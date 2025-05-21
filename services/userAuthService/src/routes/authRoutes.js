const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken } = require('../controllers/authController');
const { validateRegistration, validateLogin, checkValidation } = require('../validators/userValidator');
const passport = require('passport');

// Register route with validation
router.post('/register', validateRegistration, checkValidation, registerUser);


module.exports = router;
