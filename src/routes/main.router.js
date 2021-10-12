const router = require('express').Router();

router.get('/', (req, res) => {
  res.redirect('/auth');
});

module.exports = router;