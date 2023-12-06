

const authMiddleware = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/signup');
  }

  next();
};

module.exports = authMiddleware;