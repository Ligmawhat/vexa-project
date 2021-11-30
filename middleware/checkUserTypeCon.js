function checkUserTypeCon(req, res, next) {
  if(req.session.user.userType == 'contributor'){
    return res.redirect('/contributor/home');
  }
  next();
}

module.exports = checkUserTypeCon;
