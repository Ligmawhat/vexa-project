function authUser(req, res, next) {
  console.log(req.session.user);
  if (req.session.user) { 
    return res.redirect(`/${req.session.user.userType}/home`);
  }
  next();
}

module.exports = authUser;
