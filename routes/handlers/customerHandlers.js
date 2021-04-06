const CustomerSchema = require("../../db/models/customers");
const validator = require("../../middleware/customerValidation");

const getCustomersHandler = async (req, res) => {
  const customers = await CustomerSchema.find();
  res.send(customers);
};

const createCustomerHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const customer = new CustomerSchema({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  const result = await customer.save();
  res.send(result);
};

const updateCustomersHandler = async () => {};

const deleteCustomerHandler = async () => {};

module.exports = {
  getCustomersHandler,
  createCustomerHandler,
  updateCustomersHandler,
  deleteCustomerHandler,
};
