const express = require('express');
const router = express.Router();
const {verifyJwtAccessToken,verifyJwtRefreshToken } = require('../controllers/authController');




// Verify jwt access token
router.post('/verify-access-token', verifyJwtAccessToken);

// Verify jwt refresh token
router.post('/verify-refresh-token', verifyJwtRefreshToken);


module.exports = router;
