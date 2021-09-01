import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function TaskEdit(props) {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          required
          autoComplete="off"
          id="edit-task-input-title"
          type="text"
          placeholder="Title"
          className="form-control"
          onChange={props.onTitleChange}
          value={props.title}
        />

        <br />
        <input
          required
          autoComplete="off"
          id="edit-task-input-desc"
          type="text"
          placeholder="Description"
          className="form-control"
          onChange={props.onDescChange}
          value={props.desc}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskEdit;
