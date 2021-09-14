const express = require("express");

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const validatorMiddleware = require("../middleware/validator");
const { editBioValidator } = require("../validators/user");

const router = express.Router();

router.get("/profile", authMiddleware, userController.getProfile);

router.patch(
  "/bio",
  authMiddleware,
  validatorMiddleware(editBioValidator),
  userController.editBio
);

module.exports = router;
