const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // Assuming you're using a Mongoose model
const { OTP_EXPIRY_TIME } = process.env; // OTP expiry time from environment

// Helper function to generate OTP (6 digits)
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to send OTP to the user's email
async function sendOTP(email) {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP and its expiry time in the database
    user.otp = otp;
    user.otpExpiry = Date.now() + parseInt(OTP_EXPIRY_TIME); // OTP expiry time (e.g., 5 minutes)
    await user.save();

    // Send OTP via email (using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can configure other email services
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    return { message: 'OTP sent successfully' };
  } catch (err) {
    throw new Error(err.message || 'Failed to send OTP');
  }
}

// Function to verify OTP entered by the user
async function verifyOTP(email, otp) {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if OTP exists and is valid (expiry not passed)
    if (!user.otp || Date.now() > user.otpExpiry) {
      throw new Error('OTP expired or invalid');
    }

    // Check if the entered OTP matches the one sent
    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // OTP is valid, clear OTP and expiry time from database
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { message: 'OTP verified successfully' };
  } catch (err) {
    throw new Error(err.message || 'Failed to verify OTP');
  }
}

module.exports = {
  sendOTP,
  verifyOTP
};
