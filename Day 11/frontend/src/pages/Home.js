import React, { useEffect, useState } from "react";
import axios from "axios";
import AddContainer from "../component/AddContainer";
import TaskList from "../component/TaskList";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Hello World");
    axios
      .get("http://localhost:5000/todo")
      .then(response => {
        console.log("Request was successful!");
        const todoList = response.data.todoList;
        console.log(todoList);
        setTodos(todoList);
      })
      .catch(error => {
        console.log("Request failed!");
        console.log(error);
      })
      .finally(() => {
        console.log("Request finished!");
      });
  }, []);

  const onAdd = (title, desc) => {
    console.log({ title, desc });
    axios
      .post("http://localhost:5000/todo", {
        title,
        desc
      })
      .then(response => {
        console.log("Request was successful!");
        console.log(response.data);

        const newTodos = [...todos];
        newTodos.push(response.data.todo);
        setTodos(newTodos);
      })
      .catch(error => {
        console.log("Request failed!");
        console.log(error);
      });
  };

  const onDelete = id => {
    axios
      .delete("http://localhost:5000/todo/" + id)
      .then(response => {
        const newTodos = [...todos];

        const index = newTodos.findIndex(elem => {
          return elem.id === id;
        });

        newTodos.splice(index, 1);

        setTodos(newTodos);
      })
      .catch(error => {
        console.log("Request failed!");
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Home Page</h1> <AddContainer onAdd={onAdd} />
      <TaskList onDelete={onDelete} todos={todos} />
    </div>
  );
}

export default Home;
