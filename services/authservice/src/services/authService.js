const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Service to register a new user
const registerUser = async (email, password, name) => {
  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save the new user
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  await user.save();
  return user;
};

// Service to log a user in
const loginUser = async (email, password) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the entered password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Create and return a JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};

// Service to verify the JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
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
  verifyToken,
  getUserById,
};
