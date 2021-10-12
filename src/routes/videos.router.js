const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("videos");
});

router.get("/:id", (req, res) => {
  res.render("video");
});

module.exports = router;