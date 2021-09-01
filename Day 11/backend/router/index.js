const express = require("express");

const todoRouter = require("./todo");
const indexController = require("../controllers/index");

const router = express.Router();

// METHOD => GET, URL => /
router.get("/", indexController.homePage);

router.use("/todo", todoRouter);

// METHOD => ALL Types of METHODS, URL => All URLs
router.use((req, res) => {
  console.log(req.url);
  res.status(404);
  res.send("Page not found.");
});

module.exports = router;
