const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const jwtRoutes = require('./jwtRoutes')
const signupMiddleware = require('../middleware/userRegistrationMiddleware');
const {parseToken} = require('../middleware');
// const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authMiddleware
// const { csrfProtection } = require('../middleware/csrfProtection'); // Import the csrfProtection middleware

// Define the array of middlewares you want to use for /users routes
// const userMiddlewares = [authMiddleware, csrfProtection];

// router.use('/auth',signupMiddleware,authRoutes);
router.use('/auth',authRoutes);
router.use('/verify',parseToken,jwtRoutes);


module.exports = router;
