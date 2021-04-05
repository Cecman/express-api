const express = require("express");

const {
  allCoursesHandler,
  specificCourseHandler,
  createCourseHandler,
  updateManyCourseHandler,
  updateOneCourseHandler,
  deleteCourseHandler,
  setOneCourseHandler,

} = require("./handlers/courseHandlers");

const router = express.Router();

router.get("/", allCoursesHandler);
router.get("/:name", specificCourseHandler);
router.post("/", createCourseHandler);
router.put("/:name", updateOneCourseHandler);
router.put("/:name", updateManyCourseHandler);
router.patch("/:name", setOneCourseHandler);
router.delete("/:name", deleteCourseHandler);

module.exports = router;
