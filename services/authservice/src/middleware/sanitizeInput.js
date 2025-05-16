const xssClean = require('xss-clean');

const sanitizeInput = xssClean();

module.exports = { sanitizeInput };
