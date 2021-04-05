const express = require("express");
const dbConnection = require("../db/connection");
const {
  allCoursesHandler,
  specificCourseHandler,
  createCourseHandler,
  updateManyCourseHandler,
  updateOneCourseHandler,
  deleteCourseHandler,
} = require("./handlers/courseHandlers");

const router = express.Router();

router.get("/", allCoursesHandler);
router.get("/:name", specificCourseHandler);
router.post("/", createCourseHandler);
router.put("/:name", updateOneCourseHandler);
router.patch("/:name", updateManyCourseHandler);
router.delete("/:name", deleteCourseHandler);

module.exports = router;
