const Post = require("../../models/post");
const Like = require("../../models/like");

module.exports = {
  addLike: async (req, res) => {
    const postId = req.params.postId;

    const userData = res.locals.userData;

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }

    await Like.updateOne(
      {
        userId: userData.sub,
        postId: post._id
      },
      {
        userId: userData.sub,
        postId: post._id
      },
      { upsert: true }
    );

    res.status(200).json({ message: "Like added successfully." });
  },

  removeLike: async (req, res) => {
    const postId = req.params.postId;
    const userData = res.locals.userData;

    await Like.deleteOne({
      postId,
      userId: userData.sub
    });

    res.status(200).json({ message: "Like removed successfully." });
  }
};
