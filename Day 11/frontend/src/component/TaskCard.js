import React from "react";
import { Button } from "react-bootstrap";

function TaskCard(props) {
  const onTaskCardDelete = () => {
    props.onDelete(props.id);
  }

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">{props.title}</h6>
          <p>{props.desc}</p>
          <Button onClick={onTaskCardDelete} variant="danger" className="me-2">
            Delete
          </Button>
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
