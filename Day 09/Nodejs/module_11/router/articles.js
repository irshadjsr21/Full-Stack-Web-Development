const express = require("express");
const articleController = require("../controllers/articles");

const router = express.Router();

router.get("/", articleController.getArticles);

module.exports = router;
