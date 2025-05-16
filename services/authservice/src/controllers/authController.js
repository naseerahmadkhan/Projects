const jwtService = require('../services/jwtService');

// Controller to verify JWT token
exports.verifyJwtToken = async (req, res) => {
  try {
    const { token } = req.body;  // Expects the token in the body

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify JWT token
    const decoded = jwtService.verifyToken(token);

    // If the token is valid, return the user data
    res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
