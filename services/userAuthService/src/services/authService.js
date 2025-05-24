// authService.js
const User = require('../models/User');
const jwtService = require('./jwtService'); // Import updated jwtService
const { hashPassword, comparePassword } = require('../utils/authUtils'); // Import utility functions

// Service to register a new user
const registerUser = async ({ email, password, firstName, lastName, isActive = false, isBlocked = false }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the user with default/optional fields
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
  const accessToken = jwtService.createAccessToken(user);
  const refreshToken = jwtService.createRefreshToken(user);

  // Store the refresh token in the database
  user.refreshToken = refreshToken;
  await user.save();

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

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
