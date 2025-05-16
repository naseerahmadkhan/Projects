const Session = require('../models/Session');

// Find a session by user ID
const findSessionByUserId = async (userId) => {
  try {
    return await Session.findOne({ userId });
  } catch (error) {
    throw new Error('Error while finding session by user ID');
  }
};

// Create a new session
const createSession = async (sessionData) => {
  try {
    const session = new Session(sessionData);
    return await session.save();
  } catch (error) {
    throw new Error('Error while creating session');
  }
};

// Delete a session by session token
const deleteSessionByToken = async (sessionToken) => {
  try {
    return await Session.findOneAndDelete({ sessionToken });
  } catch (error) {
    throw new Error('Error while deleting session');
  }
};

module.exports = {
  findSessionByUserId,
  createSession,
  deleteSessionByToken,
};
