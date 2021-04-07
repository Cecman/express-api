const express = require("express");
const registerUserHandler = require("./handlers/registerHandler");

const router = express.Router();

router.post("/", registerUserHandler);

module.exports = router;
