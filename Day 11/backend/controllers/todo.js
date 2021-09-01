const uuid = require('uuid');

const todoList = [];

// Method 1
module.exports = {
  getTodos: (req, res) => {
    res.json({ todoList });
  },

  addTodos: (req, res) => {
    console.log("Add Todo called");
    console.log(req.body);

    const newTodo = {
      title: req.body.title,
      desc: req.body.desc,
      id: uuid.v4()
    };

    todoList.push(newTodo);

    res.json({ message: "Todo added successfully.", todo: newTodo });
  },

  deleteTodo: (req, res) => {
    console.log("Delete request was called!");
    const { id } = req.params;

    // Elem 1
    const index = todoList.findIndex((elem) => {
      return elem.id === id;
    });

    if (index === -1) {
      res.status(404).json({ message: "Todo not found." });
      return;
    }

    todoList.splice(index, 1);

    res.json({ message: "Todo was deleted!" });
  }
};
