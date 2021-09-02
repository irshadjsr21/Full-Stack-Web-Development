const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
