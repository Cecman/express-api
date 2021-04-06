const Joi = require("joi");

module.exports = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required().min(2),
    phone: Joi.string().required().min(5),
  });
  return schema.validate(customer);
};
