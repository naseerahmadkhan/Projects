const { generateToken, verifyToken } = require('../utils/tokenUtils');
const User = require('../models/User');
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

// Access token
const createAccessToken = (user) =>
  generateToken(
    { id: user._id, email: user.email, type: 'access' },
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN
  );

// Refresh token
const createRefreshToken = (user) =>
  generateToken(
    { id: user._id, type: 'refresh' },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN
  );

const verifyAccessToken = (token) =>
  verifyToken(token, ACCESS_TOKEN_SECRET, 'Invalid or expired access token');

const verifyRefreshToken = (token) =>
  verifyToken(token, REFRESH_TOKEN_SECRET, 'Invalid or expired refresh token');

const generateAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || decoded.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = createAccessToken(user);
    // Optional rotation:
    // const newRefreshToken = createRefreshToken(user);
    // user.refreshToken = newRefreshToken;
    // await user.save();

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
  generateAccessToken,
};
