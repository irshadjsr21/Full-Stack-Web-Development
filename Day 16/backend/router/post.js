const express = require("express");

const postController = require("../controllers/post");
const authMiddleware = require("../middleware/auth");
const validatorMiddleware = require("../middleware/validator");
const { addPostValidator, updatePostValidator } = require("../validators/post");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validatorMiddleware(addPostValidator),
  postController.addPost
);

router.get(
  "/",
  authMiddleware,
  postController.listPost
);


router.delete(
  "/:id",
  authMiddleware,
  postController.deletePost
);

router.patch(
  "/:id",
  authMiddleware,
  validatorMiddleware(addPostValidator),
  postController.updatePost
);

module.exports = router;
