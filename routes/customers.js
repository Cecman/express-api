const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getCustomersHandler,
  createCustomerHandler,
  updateCustomersHandler,
  deleteCustomerHandler,
} = require("./handlers/customerHandlers");



router.get("/", getCustomersHandler);
router.post("/create/customer/", auth, createCustomerHandler);
router.put("/update/customer/:name", auth, updateCustomersHandler);
router.delete("/delete/customer/:name", auth, deleteCustomerHandler);

module.exports = router;
