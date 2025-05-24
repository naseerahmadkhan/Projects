const {generateToken,verifyToken} = require('../utils/tokenUtils')
const User = require('../models/User');
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

// Access token functions
const createAccessToken = (user) =>
  generateToken({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN);

const verifyAccessToken = (token) =>
  verifyToken(token, ACCESS_TOKEN_SECRET, 'Invalid or expired access token');

// Refresh token functions
const createRefreshToken = (user) =>
  generateToken({ id: user._id }, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN);

const verifyRefreshToken = (token) =>
  verifyToken(token, REFRESH_TOKEN_SECRET, 'Invalid or expired refresh token');

// Service to refresh the access token using refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = createAccessToken(user);
    return { accessToken };
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  refreshAccessToken
};
