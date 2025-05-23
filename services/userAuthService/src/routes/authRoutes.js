const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const userRegistrationMiddleware = require('../middleware/userRegistrationMiddleware');
const loginMiddleware = require('../middleware/loginMiddleware');


// Register route with validation
router.post('/register',userRegistrationMiddleware,registerUser);

// Login route with validation
router.post('/login',loginMiddleware,loginUser);



module.exports = router;
