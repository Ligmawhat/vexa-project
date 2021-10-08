const router = require("express").Router();
const bcrypt = require("bcrypt");
const authUser = require("../../middleware/authUser");
const { User, UserType, Country, University } = require("../db/models");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  const userTypes = await UserType.findAll();
  const countries = await Country.findAll();
  const universities = await University.findAll();
  res.render("register", { userTypes, countries, universities });
});

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/login", authUser, async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (
        currentUser &&
        (await bcrypt.compare(password, currentUser.password))
      ) {
        const { userType } = await UserType.findByPk(currentUser.userTypeId);
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
          userType,
        };
        //FIX ME
        return res.redirect(`/${userType}/home`);
        // return res.redirect("/auth/");
      }
      return res.redirect("/auth/login");
    } catch (err) {
      return res.redirect("/auth/login");
    }
  } else {
    return res.redirect("/auth/login");
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password, country, university, userType } = req.body;
  if ((fullName && email && password && userType && password.length >= 6)) {
    try {
  //  if((userType !== "student" && userType !== "contributor") || (university !== "MSU" && university !== "MIT") || (country !== "Russia" && country !== "USA")) {
  //    return res.redirect('/auth/register')
  //  }
  const type = await UserType.findOne({ where: { name: userType } })
  console.log(type);
  if (!type) return res.redirect('/auth/register')
  const universityType = await University.findOne({ where: { name: university } })
  const countryType = await Country.findOne({ where: { name: country } })
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    fullName,
    email,
    password: hashPass,
    userTypeId: type.id,
    userpicUrl: '/images/userpics/userpic.jpg',
    universityId: universityType ? universityType.id : null,
    countryId: countryType ? countryType.id : null
  });
  req.session.user = {
        id: newUser.id,
        name: newUser.fullName,
        userType
      };
      return res.redirect(`/${userType}/home`);
    } catch (err) {
      return res.redirect('/auth/register');
    }
  } else {
    return res.redirect('/auth/register');
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("sId").redirect("/auth/login");
});

module.exports = router;
