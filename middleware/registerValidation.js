const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(6).max(255),
  });
  return schema.validate(user);
};
