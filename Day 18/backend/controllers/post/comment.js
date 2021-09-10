const Post = require("../../models/post");
const Comment = require("../../models/comment");

module.exports = {
  addComment: async (req, res) => {
    const postId = req.params.postId;
    const data = res.locals.body;
    const userData = res.locals.userData;

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }

    const comment = await Comment.create({
      body: data.body,
      userId: userData.sub,
      postId: post._id
    });

    res.status(200).json({ message: "Comment added successfully.", comment });
  },

  listComment: async (req, res) => {
    const postId = req.params.postId;
    const query = req.query;

    let page = 1;
    let itemsPerPage = 5;

    if (query && query.page) {
      page = parseInt(query.page, 10);
    }

    if (query && query.itemsPerPage) {
      itemsPerPage = parseInt(query.itemsPerPage, 10);
    }

    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .populate("userId", "_id name");

    const commentCount = await Comment.count({ postId });

    const totalPages = Math.ceil(commentCount / itemsPerPage);

    res
      .status(200)
      .json({
        comments,
        currentPage: page,
        totalPages,
        commentCount
      });
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.commentId;

    const data = await Comment.deleteOne({
      _id: commentId,
      userId: res.locals.userData.sub
    });

    if (data.deletedCount === 0) {
      res.status(404).json({ message: "Comment does not exist." });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully." });
  },

  updateComment: async (req, res) => {
    const commentId = req.params.commentId;
    const data = res.locals.body;

    const comment = await Comment.findOneAndUpdate(
      {
        _id: commentId,
        userId: res.locals.userData.sub
      },
      {
        $set: { body: data.body }
      },
      {
        new: true
      }
    );

    if (!comment) {
      res.status(404).json({ message: "Comment does not exist." });
      return;
    }

    res.status(200).json({ message: "Comment updated successfully.", comment });
  }
};
