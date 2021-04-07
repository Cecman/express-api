const CustomerSchema = require("../../db/models/customers");
const validator = require("../../middleware/customerValidation");

const getCustomersHandler = async (req, res) => {
  const customers = await CustomerSchema.find().sort("name").select('-__v -_id');
  if (customers.length < 1) {
    return res.status(404).send("No customers were found");
  }
  res.send(customers);
};

const createCustomerHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = new CustomerSchema({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  const result = await customer.save();
  res.send(result);
};

const updateCustomersHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const query = { name: req.params.name };
  const foundCustomer = await CustomerSchema.updateOne(query, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  console.log(foundCustomer.n);

  if (foundCustomer.n < 1) {
    return res
      .status(404)
      .send(
        `We have no customer with the name ${req.params.name} in our database`
      );
  }

  res.send(foundCustomer);
};

const deleteCustomerHandler = async (req, res) => {
  const deleted = await CustomerSchema.findOneAndDelete({
    name: req.params.name,
  });

  if (!deleted) {
    return res
      .status(404)
      .send(
        `There is no one with the name ${req.params.name} in our database...`
      );
  }

  res.send(deleted);
};

module.exports = {
  getCustomersHandler,
  createCustomerHandler,
  updateCustomersHandler,
  deleteCustomerHandler,
};
