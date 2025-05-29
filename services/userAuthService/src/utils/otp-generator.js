const crypto = require('crypto');

/**
 * Generate a secure numeric OTP of given length
 * @param {number} digits - Length of the OTP (e.g., 5, 6, 7)
 * @returns {string} - OTP string
 */
exports.generateOTP = (digits = 6) => {
    if (digits < 1 || digits > 10) {
        throw new Error('OTP length must be between 1 and 10 digits.');
      }
  
    const min = Math.pow(10, digits - 1); // e.g., 10000 for 5 digits
    const max = Math.pow(10, digits) - 1; // e.g., 99999 for 5 digits
  
    const otp = crypto.randomInt(min, max + 1).toString();
    console.log('otp: ',otp);
    return otp;
  };
