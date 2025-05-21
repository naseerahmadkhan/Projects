const User = require('../models/User');
const jwtService = require('./jwtService'); // Import jwtService for creating and verifying tokens
const { hashPassword, comparePassword } = require('../utils/authUtils'); // Import the utility functions

// Service to register a new user
const registerUser = async (email, password, firstName, lastName) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists');
  }

  // Hash the password using the utility function
  const hashedPassword = await hashPassword(password);

  // Create and save the new user
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  await user.save();
  return user;
};

// Service to log a user in
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the entered password with the stored hash using the utility function
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Use jwtService to create the token
  const token = jwtService.createToken(user);

  return { token, user };
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
