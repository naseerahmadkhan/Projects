const { logger } = require('../utils/logger');
module.exports = function checkAuthToken(req, res, next) {
  
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token missing from Authorization header' });
    }
    logger.info('token*******',JSON.stringify(token))
    req.token = token; // Attach token for controller use
    next();
  };
  