const express = require("express");

const commentController = require("../../controllers/post/comment");
const authMiddleware = require("../../middleware/auth");
const validatorMiddleware = require("../../middleware/validator");
const { addCommentValidator, updateCommentValidator } = require("../../validators/post/comment");

const router = express.Router();

router.get(
  "/:postId",
  authMiddleware,
  commentController.listComment
);

router.post(
  "/:postId",
  authMiddleware,
  validatorMiddleware(addCommentValidator),
  commentController.addComment
);

router.delete(
  "/:commentId",
  authMiddleware,
  commentController.deleteComment
);

router.patch(
  "/:commentId",
  authMiddleware,
  validatorMiddleware(updateCommentValidator),
  commentController.updateComment
);

module.exports = router;
