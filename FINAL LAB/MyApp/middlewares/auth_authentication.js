const authenticatedUser = (req, res, next) => {
  if(req.path != "/login"){
    req.session.myRequestedRoute = req.path;
    console.log("Requested Route set:" + req.session.myRequestedRoute);
  }
  console.log(req.session.myRequestedRoute);
  if (req.session.isAuthenticated) {
    console.log("authenticated user");
    next();
  } else {
    console.log("unauthenticated user");
    res.redirect("/login");
    return;
  }
};

module.exports = authenticatedUser;