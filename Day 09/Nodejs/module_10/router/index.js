const express = require("express");

const router = express.Router();

const controller = require("../controller/index");
const userRouter = require("./users");
const articleRouter = require("./articles");


router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.get("/", controller.getIndex);

module.exports = router;
