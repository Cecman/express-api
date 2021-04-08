const express = require("express");
const router = express.Router();
const authHandler = require("./handlers/authHandler");

router.post("/", authHandler);

module.exports = router;
