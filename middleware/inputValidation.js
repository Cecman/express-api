const Joi = require("joi");

module.exports = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    tags: Joi.array().items(Joi.string()).required(),
    isPublished: Joi.boolean(),
  });
  return schema.validate(course);
};
