const express = require('express');
const router = express.Router();
const { getUserById, updateUserProfile } = require('../controllers/userController');

// GET: /api/v1/users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT: /api/v1/users/:id - Update user profile
router.put('/:id', updateUserProfile);

module.exports = router;
