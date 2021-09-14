const mongoose = require("mongoose");
const Post = require("../../models/post");

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
    const userData = res.locals.userData;

    let page = 1;
    let itemsPerPage = 5;

    if (query && query.page) {
      page = parseInt(query.page, 10);
    }

    if (query && query.itemsPerPage) {
      itemsPerPage = parseInt(query.itemsPerPage, 10);
    }

    // 1
    //const posts = await Post.find({})
    //.sort({ createdAt: -1 })
    //.skip((page - 1) * itemsPerPage)
    //.limit(itemsPerPage)
    //.populate("userId", "_id name");
    const posts = await Post.aggregate([
      {
        $match: {}
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: (page - 1) * itemsPerPage
      },
      {
        $limit: itemsPerPage
      },
      {
        $lookup: {
          from: "users",
          let: { userIdFromPost: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userIdFromPost"]
                }
              }
            },
            {
              $project: {
                _id: 1,
                name: 1
              }
            }
          ],
          as: "user"
        }
      },
      {
        $lookup: {
          from: "comments",
          let: { postIdFromPost: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$postId", "$$postIdFromPost"]
                }
              }
            },
            { $count: "commentCount" }
          ],
          as: "comments"
        }
      },
      {
        $lookup: {
          from: "likes",
          let: { postIdFromPost: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$postId", "$$postIdFromPost"]
                }
              }
            },
            { $count: "likesCount" }
          ],
          as: "likes"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $lookup: {
          from: "likes",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$postId", "$$postId"] },
                    { $eq: ["$userId", mongoose.Types.ObjectId(userData.sub)] }
                  ]
                }
              }
            }
          ],
          as: "likesArray"
        }
      },
      {
        $addFields: {
          isLiked: { $gte: [{ $size: "$likesArray" }, 1] }
        }
      },
      {
        $project: {
          likesArray: 0
        }
      }
    ]);

    const mappedPosts = posts.map(post => {
      let commentsCount = 0;
      let likesCount = 0;

      if (post.comments && post.comments.length > 0) {
        commentsCount = post.comments[0].commentCount;
      }

      if (post.likes && post.likes.length > 0) {
        likesCount = post.likes[0].likesCount;
      }

      const newPost = {
        ...post,
        commentsCount,
        likesCount
      };

      delete newPost.comments;
      delete newPost.likes;

      return newPost;
    });

    // 2
    const postCount = await Post.count({});

    const totalPages = Math.ceil(postCount / itemsPerPage);

    res.status(200).json({ posts: mappedPosts, currentPage: page, totalPages, postCount });
  },

  deletePost: async (req, res) => {
    const id = req.params.id;

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
