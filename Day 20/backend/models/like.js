const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
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
    }
  },
  {
    timestamps: true
  }
);

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
