const User = require('../models/User');

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error('Error while finding user by email');
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error('Error while creating user');
  }
};

// Find a user by ID
const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error('Error while finding user by ID');
  }
};

// Update a user's information
const updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error while updating user');
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error while deleting user');
  }
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
};
