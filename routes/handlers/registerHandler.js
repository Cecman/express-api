const userSchema = require("../../db/models/register");
const validator = require("../../middleware/registerValidation");

const registerUserHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
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
