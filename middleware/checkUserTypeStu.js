function checkUserTypeStu(req, res, next) {
  if(req.session.user.userType == 'student'){
    return res.redirect('/student/home');
  }
  next();
}

module.exports = checkUserTypeStu;
