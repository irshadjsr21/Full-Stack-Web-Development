const express = require("express");
const articleController = require("../controllers/articles");

const router = express.Router();

router.get("/", articleController.getArticles);
router.post("/", articleController.addArticles);

module.exports = router;
