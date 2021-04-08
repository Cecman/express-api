const express = require("express");
const auth = require("../middleware/auth");
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
  // setCategoryHandler
} = require("./handlers/courseHandlers");

router.get("/", allCoursesHandler);
router.get("/:name", specificCourseHandler);
router.post("/", auth, createCourseHandler);
router.put("/:name", auth, updateOneCourseHandler);
router.put("/update/:name", auth, updateManyCourseHandler);
router.patch("/patch/:name", auth, setOneCourseHandler);
//router.patch("/patch/category/:name", setCategoryHandler);
router.delete("/:name", auth, deleteCourseHandler);
router.delete("/delete/:name", auth, deleteManyCoursesHandler);

module.exports = router;
