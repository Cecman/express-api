const userSchema = require("../../db/models/register");
const validator = require("../../middleware/registerValidation");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const getCurrentUser = async (req, res) => {
  const user = await userSchema.findById(req.user._id).select("-password");
  res.send(user);
};

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

  const user = new userSchema(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
};

module.exports = { registerUserHandler, getCurrentUser };
