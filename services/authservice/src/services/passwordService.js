const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');  // Assuming you have an email service to send emails

// Function to request a password reset
async function requestPasswordReset(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetExpires = Date.now() + 30 * 60 * 1000; // Token expires in 30 minutes

    // Store the hashed token and expiration in the database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Create a reset link
    const resetLink = `${process.env.BASE_URL}/api/v1/password/reset/${resetToken}`;

    // Send email with reset link
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}. This link will expire in 30 minutes.`,
    });

    return { message: 'Password reset email sent' };
  } catch (err) {
    throw new Error(err.message || 'Error in password reset request');
  }
}

// Function to reset the password
async function resetPassword(resetToken, password) {
  try {
    if (!resetToken || !password) {
      throw new Error('Reset token and new password are required');
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Find the user with the hashed token and check if the token is expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Password successfully reset' };
  } catch (err) {
    throw new Error(err.message || 'Error in password reset');
  }
}

module.exports = {
  requestPasswordReset,
  resetPassword,
};
