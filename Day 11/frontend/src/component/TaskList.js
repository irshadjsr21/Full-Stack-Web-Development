import React, { useEffect } from "react";
import TaskCard from "./TaskCard";

function TaskList(props) {
  useEffect(() => {
    console.log(props);
  }, [props.todos]);

  return (
    <div id="task-list" className="row g-2">
      {props.todos.map(todo => (
        <TaskCard
          onDelete={props.onDelete}
          key={todo.id}
          id={todo.id}
          title={todo.title}
          desc={todo.desc}
        />
      ))}
    </div>
  );
}

export default TaskList;
