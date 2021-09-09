const Post = require("../models/post");

module.exports = {
  addPost: async (req, res) => {
    const data = res.locals.body;
    console.log(res.locals.userData);

    const post = await Post.create({
      body: data.body,
      userId: res.locals.userData.sub
    });

    res.status(200).json({ message: "Post added successfully!", post });
  },

  listPost: async (req, res) => {
    const query = req.query;

    let page = 1;
    let itemsPerPage = 5;

    if (query && query.page) {
      page = parseInt(query.page, 10);
    }

    if (query && query.itemsPerPage) {
      itemsPerPage = parseInt(query.itemsPerPage, 10);
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .populate("userId", "_id name");

    const postCount = await Post.count({});

    const totalPages = Math.ceil(postCount / itemsPerPage);

    res.status(200).json({ posts, currentPage: page, totalPages, postCount });
  },

  deletePost: async (req, res) => {
    const id = req.params.id;

    //const post = await Post.findOne({ _id: id });

    //if (!post) {
    //// Send 404 Post not found
    //}

    //if (post.userId !== res.locals.userData.sub) {
    //// Send unauthorized
    //} else {
    //// Delete the post
    //}

    const data = await Post.deleteOne({
      _id: id,
      userId: res.locals.userData.sub
    });

    if (data.deletedCount === 0) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully." });
  },
  updatePost: async (req, res) => {
    const id = req.params.id;
    const data = res.locals.body;

    const post = await Post.findOneAndUpdate(
      {
        _id: id,
        userId: res.locals.userData.sub
      },
      {
        $set: { body: data.body }
      },
      {
        new: true
      }
    );

    if (!post) {
      res.status(404).json({ message: "Post does not exist." });
      return;
    }

    //post.body = data.body;

    //await post.save();

    res.status(200).json({ message: "Post updated successfully.", post });
  }
};
