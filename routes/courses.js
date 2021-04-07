const express = require("express");
const router = express.Router();
const {
  allCoursesHandler,
  specificCourseHandler,
  createCourseHandler,
  updateManyCourseHandler,
  updateOneCourseHandler,
  deleteCourseHandler,
  setOneCourseHandler,
  deleteManyCoursesHandler,
} = require("./handlers/courseHandlers");

router.get("/", allCoursesHandler);
router.get("/:name", specificCourseHandler);
router.post("/", createCourseHandler);
router.put("/:name", updateOneCourseHandler);
router.put("/update/:name", updateManyCourseHandler);
router.patch("/patch/:name", setOneCourseHandler);
router.delete("/:name", deleteCourseHandler);
router.delete("/delete/:name", deleteManyCoursesHandler);

module.exports = router;
