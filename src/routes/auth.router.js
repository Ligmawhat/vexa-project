const router = require('express').Router();
const bcrypt = require('bcrypt');
const authUser = require('../middleware/authUser');
const { User, UserType, Country, University } = require('../db/models');



router.get('/login', (req,res) => {
  res.render('login')
})

router.get('/register', async (req,res) => {
  const userTypes = await UserType.findAll();
  const countries = await Country.findAll();
  const universities = await University.findAll(); 
  res.render('register', { userTypes, countries, universities })
})

router.get('/', (req,res) => {
  res.render('home')
})

router.post('/login', authUser ,async (req,res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
        const { userType } = await UserType.findByPk(currentUser.userTypeId);
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
          userType
        };
        //FIX ME
        // return res.redirect(`/${userType}/home`);
        return res.redirect('/auth/');
      }
      return res.redirect('/auth/login');
    } catch (err) {
      return res.redirect('/auth/login');
    }
  } else {
    return res.redirect('/auth/login');
  }
})

router.post('/registr', async (req,res) => {
  const { name, email, password } = req.body;
  if ((name && email && password && password.length >= 6)) {
    try {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashPass });
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };
      return res.redirect('/auth');
    } catch (err) {
      return res.redirect('/auth/registr');
    }
  } else {
    return res.redirect('/auth/registr');
  }
})


router.post('/logout', (req,res) => {
  req.session.destroy();
  res.clearCookie('sId').redirect('/auth/login');
})

module.exports = router;
