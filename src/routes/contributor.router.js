const router = require('express').Router();


router.get('/', (req,res) => {
  res.render('contributor/home')
})

router.get('/', (req,res) => {
res.render('contributor/')
})

module.exports = router
