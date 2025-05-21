const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const signupMiddleware = require('../middleware/userRegistrationMiddleware');
// const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authMiddleware
// const { csrfProtection } = require('../middleware/csrfProtection'); // Import the csrfProtection middleware

// Define the array of middlewares you want to use for /users routes
// const userMiddlewares = [authMiddleware, csrfProtection];

router.use('/auth',signupMiddleware,authRoutes);


module.exports = router;
