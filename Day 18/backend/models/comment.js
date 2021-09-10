const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "post",
      required: true
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
