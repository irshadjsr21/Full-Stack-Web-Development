const Todo = require("../models/todo");

// Method 1
module.exports = {
  getTodos: async (req, res) => {
    try {
      console.log(req.query);

      const todoList = await Todo.find({});

      res.json({ todoList });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  addTodos: async (req, res) => {
    try {
      console.log("Add Todo called");
      console.log(req.body);

      const newTodo = new Todo({
        title: req.body.title,
        desc: req.body.desc
      });

      //const newTodo = await Todo.create({
      //title: req.body.title,
      //desc: req.body.desc
      //});

      console.log(newTodo);

      await newTodo.save();

      res.json({ message: "Todo added successfully.", todo: newTodo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      console.log("Delete request was called!");
      const { id } = req.params;

      const result = await Todo.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        res.status(404);
        res.json({ message: "Todo not found." });
        return;
      }

      console.log(result);

      res.json({ message: "Todo was deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateTodo: async (req, res) => {
    try {
      console.log("Delete request was called!");
      const { id } = req.params;

      const { title, desc } = req.body;

      const todo = await Todo.findOneAndUpdate(
        { _id: id },
        { title, desc },
        { new: true }
      );

      res.json({ message: "Todo was updated!", todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error." });
    }
  }
};
