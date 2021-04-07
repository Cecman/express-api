const { Category } = require("../../db/models/category");

const getCategoriesHandler = async () => {};

const createCategoryHandler = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  const result = await category.save();
  res.send(result);
};

const updateCategoryHandler = async () => {};

const deleteCategoryHandler = async () => {};

module.exports = {
  getCategoriesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
