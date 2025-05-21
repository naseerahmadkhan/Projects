const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser
} = require('../controllers/userController');

// GET: /api/v1/users - Get all users (public or without authentication)
router.get('/', getAllUsers);

// GET: /api/v1/users/:id - Get user by ID
router.get('/:id', getUserById); // No need to apply authMiddleware here if it's already globally applied

// PUT: /api/v1/users/:id - Update user profile
router.put('/:id', updateUserProfile); // No need to apply authMiddleware here

// DELETE: /api/v1/users/:id - Delete user
router.delete('/:id', deleteUser); // No need to apply authMiddleware here

module.exports = router;
