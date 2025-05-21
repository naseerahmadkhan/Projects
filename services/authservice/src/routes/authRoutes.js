const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken } = require('../controllers/authController');
const { validateRegistration, validateLogin, checkValidation } = require('../validators/userValidator');
const passport = require('passport');

// Register route with validation
router.post('/register', validateRegistration, checkValidation, registerUser);

// Login route with validation
router.post('/login', validateLogin, checkValidation, loginUser);

// Logout route (no validation needed)
router.post('/logout', logoutUser);

// Get user profile route
router.get('/me', getUserProfile);

// JWT Token Verification route
router.post('/verify-token', verifyJwtToken);  // New endpoint to verify JWT token

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful login
      // Instead of sending JSON in /google/callback, you can redirect to your frontend:
      // res.redirect(`http://your-frontend.com/dashboard?token=xyz`);

      res.json({ message: 'Google login successful', user: req.user });
    }
  );

module.exports = router;
