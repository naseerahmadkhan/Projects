// authService.js
const User = require('../models/User');
const jwtService = require('./jwtService'); // Import updated jwtService
const { hashPassword, comparePassword } = require('../utils/authUtils'); // Import utility functions
const {sendSms} = require('../utils/sendSms')
const Otp = require('../models/Otp');
const {generateOTP} = require('../utils/otp-generator');
const bcrypt = require('bcrypt');

// Constants for maximum attempts and lock duration
const MAX_ATTEMPTS = 3;
const LOCK_DURATION_MINUTES = 15;

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





/**
 * Check if the OTP is currently locked due to too many failed attempts.
 */
const isOtpLocked = (otpRecord) => {
  const now = new Date();
  return otpRecord.lockedUntil && otpRecord.lockedUntil > now;
};

/**
 * Calculate how many minutes are left until the user is unlocked.
 */
const getRemainingLockMinutes = (lockedUntil) => {
  //  lockedUntil = 2025-05-29T10:30:00.000Z
  //  now = 2025-05-29T10:27:20.000Z
  //  (lockedUntil - now) = 160000 milliseconds
  //  160000 / 60000 = 2.66 minutes
  //  Math.ceil(2.66) = 3
  //  60000  milliseconds in one minute
  //  "Try again in 3 minutes."

  const now = new Date();
  return Math.ceil((lockedUntil - now) / 60000);
};

/**
 * Check if the OTP has expired.
 */
const hasOtpExpired = (otpRecord) => {
  return otpRecord.expiresAt < new Date();
};

/**
 * Set a lock on the OTP record for a specified duration.
 */
const lockOtp = (otpRecord) => {
  otpRecord.lockedUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);
};

/**
 * Handle failed OTP attempts by incrementing the counter and locking if necessary.
 */
const handleInvalidOtp = async (otpRecord) => {
  otpRecord.attempts += 1;

  if (otpRecord.attempts >= MAX_ATTEMPTS) {
    lockOtp(otpRecord);
  }

  await otpRecord.save();
};

/**
 * Main service to verify the OTP for a user.
 */
const verifyOtp = async (userId, otpInput) => {
  // 1. Fetch OTP record from the database
  const otpRecord = await Otp.findOne({ userId });
  if (!otpRecord) throw new Error('No OTP found or already used');

  // 2. Check if the OTP is currently locked
  if (isOtpLocked(otpRecord)) {
    const remaining = getRemainingLockMinutes(otpRecord.lockedUntil);
    throw new Error(`Too many failed attempts. Try again in ${remaining} minute(s).`);
  }

  // 3. Check if OTP has expired
  if (hasOtpExpired(otpRecord)) {
    await Otp.deleteOne({ userId }); // Clean up expired OTP
    throw new Error('OTP has expired');
  }

  // 4. Compare input OTP with hashed OTP in DB
  const isMatch = await bcrypt.compare(otpInput, otpRecord.otp);
  if (!isMatch) {
    await handleInvalidOtp(otpRecord); // Track failed attempt
    throw new Error('Invalid OTP');
  }

  // 5. OTP is valid — mark user as active and delete OTP record
  await User.findByIdAndUpdate(userId, { isActive: true });
  await Otp.deleteOne({ userId });

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  verifyOtp
};
