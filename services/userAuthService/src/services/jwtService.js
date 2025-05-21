const jwt = require('jsonwebtoken');
const { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = process.env;

// Service to create an access JWT token
const createAccessToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN } // 15m for example
  );
  return token;
};

// Service to create a refresh JWT token
const createRefreshToken = (user) => {
  const token = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN } // 7d for example
  );
  return token;
};

// Service to verify the access token
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

// Service to verify the refresh token
const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
