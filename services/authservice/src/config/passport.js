const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Add Facebook, Apple, etc., as needed.

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Logic to find or create user
  done(null, profile);
}));

module.exports = passport;
