const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("/student/home");
});

router.get("/program", (req, res) => {
  res.render("student/program");
});

router.get("/profile", (req, res) => {
  res.render("student/profileStudent");
});

router.get("/home", (req, res) => {
  res.render("student/home");
});

module.exports = router;
