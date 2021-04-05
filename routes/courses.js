const express = require("express");
const asyncMiddleware = require("../middleware/async");
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

router.get("/", asyncMiddleware(allCoursesHandler));
router.get("/:name", asyncMiddleware(specificCourseHandler));
router.post("/", asyncMiddleware(createCourseHandler));
router.put("/:name", asyncMiddleware(updateOneCourseHandler));
router.put("/update/:name", asyncMiddleware(updateManyCourseHandler));
router.patch("/:name", asyncMiddleware(setOneCourseHandler));
router.delete("/:name", asyncMiddleware(deleteCourseHandler));

module.exports = router;
