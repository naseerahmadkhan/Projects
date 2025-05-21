const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const passwordRoutes = require('./passwordRoutes');
const userRoutes = require('./userRoutes');
const otpRoutes = require('./otpRoutes');
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authMiddleware
const { csrfProtection } = require('../middleware/csrfProtection'); // Import the csrfProtection middleware

// Define the array of middlewares you want to use for /users routes
const userMiddlewares = [authMiddleware, csrfProtection];

// Mount all the sub-routes
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);

// Apply the middlewares to /users routes
router.use('/users', userMiddlewares, userRoutes); // Protect /users routes with multiple middlewares

router.use('/otp', otpRoutes);

module.exports = router;
