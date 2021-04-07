const express = require("express");
const {
  getCategoriesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("./handlers/categoriesHandler");
const router = express.Router();

router.get("/", getCategoriesHandler);
router.post("/create/category", createCategoryHandler);
router.put("/update/category", updateCategoryHandler);
router.delete("/delete/category", deleteCategoryHandler);

module.exports = router;
