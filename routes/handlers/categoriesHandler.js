const { Category } = require("../../db/models/category");

const getCategoriesHandler = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

const createCategoryHandler = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  const result = await category.save();
  res.send(result);
};

const updateCategoryHandler = async (req, res) => {
  const query = { name: req.params.name };
  const updated = await Category.updateOne(query, { name: req.body.name });

  res.send(updated);
};

const deleteCategoryHandler = async (req, res) => {
  const deleted = await Category.findOneAndDelete({ name: req.params.name });
  if (!deleted) {
    return res
      .status(404)
      .send(`There is no ${req.params.name} currently in our database.`);
  }

  res.send(deleted);
};

module.exports = {
  getCategoriesHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
