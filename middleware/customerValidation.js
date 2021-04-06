const Joi = require("joi");

module.exports = (customer) => {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required().min(2),
    phone: Joi.number(),
  });
  return schema.validate(customer);
};
