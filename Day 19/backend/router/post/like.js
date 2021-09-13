const express = require("express");

const likeController = require("../../controllers/post/like");
const authMiddleware = require("../../middleware/auth");
const validatorMiddleware = require("../../middleware/validator");

const router = express.Router();

router.post(
  "/:postId",
  authMiddleware,
  likeController.addLike
);

router.delete(
  "/:postId",
  authMiddleware,
  likeController.removeLike
);

module.exports = router;
