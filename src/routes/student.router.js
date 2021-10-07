const router = require('express').Router();


router.get('/', (req,res) => {
res.render('student/home')
})

router.get('/program', (req,res) => {
res.render('student/program')
})


module.exports = router
