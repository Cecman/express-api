const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(6).max(255),
  });
  return schema.validate(user);
};
