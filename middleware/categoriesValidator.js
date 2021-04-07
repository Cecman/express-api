const Joi = require("joi");

module.exports = (category) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(category);
};
