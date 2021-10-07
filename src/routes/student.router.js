const router = require('express').Router();


router.get('/', (req,res) => {
res.render('student/home')
})


module.exports = router
