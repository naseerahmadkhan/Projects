const PasswordService = require('../services/passwordService');

// @desc    Request a password reset
// @route   POST /api/v1/password/reset-request
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await PasswordService.requestPasswordReset(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reset password
// @route   POST /api/v1/password/reset
exports.resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const result = await PasswordService.resetPassword(resetToken, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
