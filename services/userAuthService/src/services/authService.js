// authService.js
const User = require('../models/User');
const jwtService = require('./jwtService'); // Import updated jwtService
const { hashPassword, comparePassword } = require('../utils/authUtils'); // Import utility functions
const {sendSms} = require('../utils/sendSms')
const Otp = require('../models/Otp');
const {generateOTP} = require('../utils/otp-generator');
const bcrypt = require('bcrypt');

// Service to register a new user
const registerUser = async ({ email, password, firstName, lastName, isActive = false, isBlocked = false }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists');
  }

   // 1. Hash the password
  const hashedPassword = await hashPassword(password);

   // 2. Create user
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    isActive,
    isBlocked,
    lastLogin: [], // initialize login history
    changedPasswords: [hashedPassword], // store the first hashed password
  });


  await user.save();

  // 3. Generate OTP
  const otp = generateOTP(6); // e.g., '123456'
  const hashedOtp = await bcrypt.hash(otp, 10);

    // 4. Store OTP in DB
    try {
      await Otp.create({
        userId: user._id,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      console.log('OTP saved to DB');
    } catch (err) {
      console.error('Failed to store OTP:', err.message);
    }
    

  // 5. Send OTP via SMS or Email
  await sendSms(user.email, `Your verification code is: ${otp}`);

  return user;
};

// Service to login the user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate access token and refresh token using jwtService
  const refreshToken = await jwtService.createRefreshToken(user);
  const accessToken = jwtService.createAccessToken(user);



  return { user, accessToken, refreshToken };
};


// Service to get the user by ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};


// Service to verify otp
const verifyOtp = async (userId, otpInput) => {
  const otpRecord = await Otp.findOne({ userId });

  if (!otpRecord) {
    throw new Error('No OTP found or already used');
  }

  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({ userId });
    throw new Error('OTP has expired');
  }

  const isMatch = await bcrypt.compare(otpInput, otpRecord.otp);
  if (!isMatch) {
    throw new Error('Invalid OTP');
  }

  // Optional: Mark user as verified
  await User.findByIdAndUpdate(userId, { isActive: true });

  // Optional: Delete OTP after successful verification
  await Otp.deleteOne({ userId });

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  verifyOtp
};
