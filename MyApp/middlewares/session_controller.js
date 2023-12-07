

const authMiddleware = (req, res, next) => {
  if (userInfo.session.) {
    return res.redirect('/signup');
  }

  next();
};

module.exports = authMiddleware;