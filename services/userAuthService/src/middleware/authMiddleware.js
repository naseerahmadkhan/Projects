const { validateLogin, validateRegistration, checkValidation } = require('../validators/userValidator');

exports.validateLogin = [validateLogin,checkValidation];
exports.validateRegistration = [validateRegistration,checkValidation]


