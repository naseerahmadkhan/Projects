const User = require('../models/User');

// Get all users (excluding sensitive fields)
const getAllUsers = async () => {
  return await User.find().select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry');
};

// Get a single user by ID
const getUserById = async (userId) => {
  return await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry');
};

// Update user by ID
const updateUser = async (userId, data) => {
  const allowedFields = ['name', 'email'];
  const updates = {};

  allowedFields.forEach(field => {
    if (data[field]) updates[field] = data[field];
  });

  return await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
    select: '-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry'
  });
};

// Delete user by ID
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

