const PasswordReset = require('../models/PasswordReset');

// Find password reset request by user ID
const findPasswordResetByUserId = async (userId) => {
  try {
    return await PasswordReset.findOne({ userId });
  } catch (error) {
    throw new Error('Error while finding password reset request by user ID');
  }
};

// Create a new password reset request
const createPasswordReset = async (resetData) => {
  try {
    const passwordReset = new PasswordReset(resetData);
    return await passwordReset.save();
  } catch (error) {
    throw new Error('Error while creating password reset request');
  }
};

// Delete password reset request by user ID
const deletePasswordResetByUserId = async (userId) => {
  try {
    return await PasswordReset.findOneAndDelete({ userId });
  } catch (error) {
    throw new Error('Error while deleting password reset request');
  }
};

module.exports = {
  findPasswordResetByUserId,
  createPasswordReset,
  deletePasswordResetByUserId,
};
