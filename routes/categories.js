const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getCategoriesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("./handlers/categoriesHandler");

router.get("/", getCategoriesHandler);
router.post("/create/category", auth, createCategoryHandler);
router.put("/update/category/:name", auth, updateCategoryHandler);
router.delete("/delete/category/:name", auth, deleteCategoryHandler);

module.exports = router;
