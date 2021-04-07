const { Category } = require("../../db/models/category");
const validator = require("../../middleware/categoriesValidator");

const getCategoriesHandler = async (req, res) => {
  const categories = await Category.find().select("name -_id");
  if (categories.length < 1) {
    return res.status(404).send("No categories were found");
  }
  res.send(categories);
};

const createCategoryHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const category = new Category({
    name: req.body.name,
  });
  const result = await category.save();
  res.send(result);
};

const updateCategoryHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
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
