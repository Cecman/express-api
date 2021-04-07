const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(user);
};
