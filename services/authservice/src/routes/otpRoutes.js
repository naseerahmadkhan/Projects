const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/otpController');

// POST: /api/v1/otp/send - Request OTP
router.post('/send', sendOTP);

// POST: /api/v1/otp/verify - Verify OTP
router.post('/verify', verifyOTP);

module.exports = router;
