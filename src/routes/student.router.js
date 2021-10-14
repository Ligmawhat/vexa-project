const router = require("express").Router();
const { student: api } = require("../db/api");

router.get("/", (req, res) => {
  res.redirect("/student/home");
});

router.get("/program/:id", async (req, res) => {
  // добавить проверку на наличие доступа у юзера
  // const courseInfo = await api.getCourseInfo(req.params.id);
  res.render("student/program");
});

router.get("/program/:id/:weeknum", async (req, res) => {
  const weekInfo = await api.getCourseWeek(req.params.id, req.params.weeknum);
  res.json(weekInfo);
});         //отлов ошибок //проверка пользователя на доступ (мидлвар)

router.get("/profile", (req, res) => {
  res.render("student/profileStudent");
});

router.get("/home", async (req, res) => {
  const courseBrief = await api.getUsersCourseBrief(req.session.user.id);
  res.locals.flagUrl = courseBrief.flagUrl;
  res.locals.courseId = courseBrief.id;
  res.render("student/home");
});

module.exports = router;
