const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();

router.get("/", todoController.getTodos);
router.post("/", todoController.addTodos);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
