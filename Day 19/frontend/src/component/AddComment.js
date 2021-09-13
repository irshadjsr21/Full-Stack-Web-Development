import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddComment(props) {
  const [body, setBody] = useState("");

  const onInputChange = event => {
    setBody(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(body);
  };

  useEffect(() => {
    if (!props.isLoading && !props.errorMessage) {
      setBody("");
    }
  }, [props.isLoading]);

  return (
    <Form className="mb-4" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formComment">
        <Form.Control
          value={body}
          as="textarea"
          //isInvalid={!!inputErrors.name}
          onChange={onInputChange}
          style={{ height: "100px" }}
          placeholder="Comment"
        />
      </Form.Group>
      <Button disabled={props.isLoading} variant="primary" type="submit">
        Comment
      </Button>
    </Form>
  );
}

export default AddComment;
