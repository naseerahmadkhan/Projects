const { logger } = require('../utils/logger');

module.exports = function parseToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  let tokenFromHeader = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    tokenFromHeader = authHeader.split(' ')[1];
  }

  const tokenFromCookie = req.cookies?.refreshToken;
  const tokenFromBody = req.body?.refreshToken;

  req.token = tokenFromHeader || tokenFromCookie || tokenFromBody;

  if (!req.token) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  logger.info('Refresh token extracted:', JSON.stringify(req.token));
  next();
};
