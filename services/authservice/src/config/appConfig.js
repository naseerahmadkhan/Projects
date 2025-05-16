module.exports = {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    }
  };
  