const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  body: { type: String, required: true, unique: true }
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
