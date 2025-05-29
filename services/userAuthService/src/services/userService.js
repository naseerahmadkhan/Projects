const User = require('../models/User');

// Fetch user by ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Fetch user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  getUserById,
  getUserByEmail
};
