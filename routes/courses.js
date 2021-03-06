const { Router, response } = require("express");
const Course = require("../models/course");
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.find()
    .populate("userId", "email name")
    .select("price title img");
  console.log(courses);
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses,
  });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("course", {
    layout: "empty",
    title: `Course ${course.title}`,
    course,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.findById(req.params.id);
  res.render("course-edit", {
    title: `Update course ${course.title}`,
    course,
  });
});

router.post("/edit", async (req, res) => {
  await Course.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/courses");
});

router.post("/remove", async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
