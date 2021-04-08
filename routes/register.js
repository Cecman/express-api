const express = require("express");
const auth = require("../middleware/auth");
const {getCurrentUser, registerUserHandler} = require("./handlers/registerHandler");

const router = express.Router();

router.get("/me", auth, getCurrentUser)
router.post("/", registerUserHandler);

module.exports = router;
