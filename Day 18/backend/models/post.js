const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    body: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
