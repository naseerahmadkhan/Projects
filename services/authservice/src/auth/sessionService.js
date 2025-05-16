exports.createSession = (req, user) => {
    req.session.user = {
      id: user._id,
      email: user.email,
    };
  };
  
  exports.destroySession = (req) => {
    req.session.destroy();
  };
  