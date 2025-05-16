const { v4: uuidv4 } = require('uuid');

exports.generateRefreshToken = () => {
  return uuidv4();
};

// You could later add DB/store handling to persist refresh tokens here
