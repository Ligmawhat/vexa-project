const router = require('express').Router();


router.get('/', (req,res) => {
  res.render('contributor/home')
})


module.exports = router
