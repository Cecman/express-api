const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  isGold: Boolean,
  name: String,
  phone: Number,
});

module.exports = mongoose.model("Customer", CustomersSchema);
