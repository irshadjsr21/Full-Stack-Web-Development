const express = require("express");

const { signupValidator, loginValidator } = require("../validators/auth");
const validatorMiddleware = require("../middleware/validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",
  validatorMiddleware(signupValidator),
  authController.signup
);

router.post(
  "/login",
  validatorMiddleware(loginValidator),
  authController.login
);

module.exports = router;
