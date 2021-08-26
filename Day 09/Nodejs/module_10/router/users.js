const express = require("express");
const router = express.Router();

const controller = require("../controller/users");

router.get("/", controller.getUsers);

module.exports = router;
