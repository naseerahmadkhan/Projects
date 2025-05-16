const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
