import React from "react";
import TaskCard from "./TaskCard";

function TaskList(props) {
  return (
    <div id="task-list" className="row g-2">
      {props.todos.map(todo => (
        <TaskCard
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          key={todo._id}
          id={todo._id}
          title={todo.title}
          desc={todo.desc}
        />
      ))}
    </div>
  );
}

export default TaskList;
