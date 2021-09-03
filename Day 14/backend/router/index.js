const express = require("express");

const authRouter = require("./auth");
const indexController = require("../controllers/index");

const router = express.Router();

// METHOD => GET, URL => /
router.get("/", indexController.homePage);

router.use("/auth", authRouter);

// METHOD => ALL Types of METHODS, URL => All URLs
router.use((req, res) => {
  console.log(req.url);
  res.status(404);
  res.json({ message: "Page not found." });
});

module.exports = router;
