const userSchema = require("../../db/models/register");
const validator = require("../../middleware/authentication");
const bcrypt = require("bcrypt");

const authHandler = async (req, res) => {
  const { error } = validator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await userSchema.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send(`Invalid email or password`);
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send(`Invalid email or password`);
  }
  const token = user.generateAuthToken();
  res.send(token);
};

module.exports = authHandler;
