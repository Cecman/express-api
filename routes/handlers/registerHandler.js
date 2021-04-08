const userSchema = require("../../db/models/register");
const validator = require("../../middleware/registerValidation");

const registerUserHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const found = await userSchema.findOne({ email: req.body.email });

  if (found) {
    return res
      .status(400)
      .send(`There is a user already registered with that email address`);
  }

  const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const result = await user.save();
  res.send(result);
};

module.exports = registerUserHandler;
