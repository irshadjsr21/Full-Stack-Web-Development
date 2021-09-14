const express = require("express");

const commentRouter = require("./comment");
const likeRouter = require("./like");

const postController = require("../../controllers/post");
const authMiddleware = require("../../middleware/auth");
const validatorMiddleware = require("../../middleware/validator");
const {
  addPostValidator,
  updatePostValidator
} = require("../../validators/post");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validatorMiddleware(addPostValidator),
  postController.addPost
);

router.get("/", authMiddleware, postController.listPost);

router.delete("/:id", authMiddleware, postController.deletePost);

router.patch(
  "/:id",
  authMiddleware,
  validatorMiddleware(updatePostValidator),
  postController.updatePost
);

router.use("/comment", commentRouter);
router.use("/like", likeRouter);

module.exports = router;
