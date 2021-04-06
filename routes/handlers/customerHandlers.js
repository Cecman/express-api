const CustomerSchema = require("../../db/models/customers");
const validator = require("../../middleware/customerValidation");

const getCustomersHandler = async (req, res) => {
  const customers = await CustomerSchema.get();
  res.send(customers);
};

const createCustomerHandler = async () => {};

const updateCustomersHandler = async () => {};

const deleteCustomerHandler = async () => {};

module.exports = {
  getCustomersHandler,
  createCustomerHandler,
  updateCustomersHandler,
  deleteCustomerHandler,
};
