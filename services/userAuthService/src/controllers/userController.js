const User = require('../models/User');

// @desc    Get user data by ID
// @route   GET /api/v1/user/:userId
// @access  Private (Requires Authentication)
exports.getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user data from the database using userId
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Remove sensitive information before sending response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.changedPasswords;

    res.status(200).json({
      message: 'User data fetched successfully',
      user: userResponse,
    });
  } catch (err) {
    console.error('Error fetching user data:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
