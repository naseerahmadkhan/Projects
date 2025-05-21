const OTPService = require('../services/OTPService');

// @desc    Send OTP to the user's email
// @route   POST /api/v1/otp/send
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await OTPService.sendOTP(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Verify OTP entered by the user
// @route   POST /api/v1/otp/verify
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await OTPService.verifyOTP(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
