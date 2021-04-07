const express = require("express");
const router = express.Router();
const {
  getCategoriesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} = require("./handlers/categoriesHandler");


router.get("/", getCategoriesHandler);
router.post("/create/category", createCategoryHandler);
router.put("/update/category/:name", updateCategoryHandler);
router.delete("/delete/category/:name", deleteCategoryHandler);

module.exports = router;
