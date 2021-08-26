const express = require("express");
const router = express.Router();

const controller = require("../controller/articles");

router.get("/", controller.getArticles);

module.exports = router;
