import React, { useState } from "react";

function AddContainer(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const onTitleChange = event => {
    setTitle(event.target.value);
  };

  const onDescChange = event => {
    setDesc(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onAdd(title, desc);
    setTitle('');
    setDesc('');
  };

  return (
    <form id="add-task-form" className="row my-5" onSubmit={onSubmit}>
      <div className="col-5">
        <input
          required
          autoComplete="off"
          id="add-task-input-title"
          type="text"
          placeholder="Title"
          className="form-control"
          onChange={onTitleChange}
          value={title}
        />
      </div>

      <div className="col-5">
        <input
          required
          autoComplete="off"
          id="add-task-input-desc"
          type="text"
          placeholder="Description"
          className="form-control"
          onChange={onDescChange}
          value={desc}
        />
      </div>

      <div className="col-2">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
}

export default AddContainer;
