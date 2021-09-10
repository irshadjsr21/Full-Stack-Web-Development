const express = require("express");

const authRouter = require("./auth");
const userRouter = require("./user");
const postRouter = require("./post");
const indexController = require("../controllers/index");

const router = express.Router();

// METHOD => GET, URL => /
router.get("/", indexController.homePage);

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

// METHOD => ALL Types of METHODS, URL => All URLs
router.use((req, res) => {
  console.log(req.url);
  res.status(404);
  res.json({ message: "Page not found." });
});

module.exports = router;
