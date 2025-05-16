const AuditLog = require('../models/AuditLog');
const nodemailer = require('nodemailer');
const { logger } = require('./logger');

// Log user activity in the system
const logUserActivity = async (userId, action, ipAddress, userAgent, additionalInfo = {}) => {
  try {
    const log = new AuditLog({
      userId,
      action,
      ipAddress,
      userAgent,
      additionalInfo
    });
    await log.save();
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

// Send a notification email for new login from different location/device
const sendLoginNotification = async (email, location) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Login Notification',
      text: `New login detected from location/device: ${location}`
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Login notification sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending login notification: ${error.message}`);
  }
};

// Login function with location detection, notification, and audit logging
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const currentLocation = req.useragent.source;
    if (user.lastLogin.location !== currentLocation) {
      await sendLoginNotification(email, currentLocation);
    }

    // Update last login location
    user.lastLogin.location = currentLocation;
    user.lastLogin.timestamp = new Date();
    await user.save();

    // Log the activity in the audit logs
    await logUserActivity(user._id, 'User Login', req.ip, req.useragent.source);

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { loginUser, sendLoginNotification, logUserActivity };
