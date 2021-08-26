const express = require("express");

const userRouter = require("./users");
const articleRouter = require("./articles");
const indexController = require("../controllers/index");

const router = express.Router();

// METHOD => GET, URL => /
router.get("/", indexController.homePage);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

// METHOD => ALL Types of METHODS, URL => All URLs
router.use((req, res) => {
  console.log(req.url);
  res.status(404);
  res.send("Page not found.");
});

module.exports = router;
