const express = require("express");
const {
  getCustomersHandler,
  createCustomerHandler,
  updateCustomersHandler,
  deleteCustomerHandler,
} = require("./handlers/customerHandlers");

const router = express.Router();

router.get("/", getCustomersHandler);
router.post("/create/customer/", createCustomerHandler);
router.put("/update/customer/:name", updateCustomersHandler);
router.delete("/delete/customer/:name", deleteCustomerHandler);

module.exports = router;
