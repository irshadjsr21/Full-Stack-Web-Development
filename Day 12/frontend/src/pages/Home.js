import React, { useEffect, useState } from "react";
import axios from "axios";
import AddContainer from "../component/AddContainer";
import TaskList from "../component/TaskList";
import TaskEdit from "../component/TaskEdit";

function Home() {
  const [todos, setTodos] = useState([]);

  const [showEdit, setShowEdit] = useState(false);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const onEditTitleChange = event => {
    setEditTitle(event.target.value);
  };

  const onEditDescChange = event => {
    setEditDesc(event.target.value);
  };

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

  const onEdit = id => {
    console.log(id);
    const index = todos.findIndex(elem => elem.id === id);

    if (index === -1) {
      return;
    }

    setEditTitle(todos[index].title);
    setEditDesc(todos[index].desc);
    setEditId(todos[index].id);

    setShowEdit(true);
  };

  const onClose = () => {
    setShowEdit(false);
  };

  const onEditSave = () => {
    console.log({ editTitle, editDesc, editId });
    axios
      .patch("http://localhost:5000/todo/" + editId, {
        title: editTitle,
        desc: editDesc
      })
      .then(response => {
        const newTodos = [...todos];

        const index = newTodos.findIndex(elem => {
          return elem.id === editId;
        });

        newTodos[index] = {
          id: editId,
          title: response.data.todo.title,
          desc: response.data.todo.desc
        };

        setTodos(newTodos);
      })
      .catch(error => {
        console.log("Request failed!");
        console.log(error);
      }).finally(() => {
        setShowEdit(false);
      });
  };

  return (
    <div>
      <TaskEdit
        title={editTitle}
        desc={editDesc}
        onTitleChange={onEditTitleChange}
        onDescChange={onEditDescChange}
        show={showEdit}
        onClose={onClose}
        onSave={onEditSave}
      />
      <h1>Home Page</h1> <AddContainer onAdd={onAdd} />
      <TaskList onEdit={onEdit} onDelete={onDelete} todos={todos} />
    </div>
  );
}

export default Home;
