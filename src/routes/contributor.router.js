const router = require("express").Router();

router.get("/home", (req, res) => {
  res.render("contributor/homeContributor");
});

router.get("/upload", (req, res) => {
  res.render("contributor/upload");
});

router.get("/profile", (req, res) => {
  res.render("contributor/profileContributor");
});

module.exports = router;
