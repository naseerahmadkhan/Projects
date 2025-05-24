const jwt = require('jsonwebtoken');

// Generic token generator
const generateToken = (payload, secret, expiresIn) =>
  jwt.sign(payload, secret, { expiresIn });

// Generic token verifier
const verifyToken = (token, secret, errorMessage) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error(errorMessage || 'Invalid or expired token');
  }
};


module.exports = {
    generateToken,
    verifyToken
  };