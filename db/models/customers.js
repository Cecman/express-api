const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 3 },
  phone: { type: String, required: true, minlength: 5 },
});

module.exports = mongoose.model("Customer", CustomersSchema);
