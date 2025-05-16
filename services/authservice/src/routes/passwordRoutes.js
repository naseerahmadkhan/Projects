const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

// POST: /api/v1/password/reset-request - Request password reset
router.post('/reset-request', requestPasswordReset);

// POST: /api/v1/password/reset - Reset password with token
router.post('/reset', resetPassword);

module.exports = router;
