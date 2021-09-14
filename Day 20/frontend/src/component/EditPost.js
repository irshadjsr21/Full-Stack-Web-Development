import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

function EditPost(props) {
  const [body, setBody] = useState("");

  const onInputChange = event => {
    setBody(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(props.post._id, body);
  };

  useEffect(() => {
    if (props.show) {
      setBody(props.post.body);
    }
  }, [props.show]);

  useEffect(() => {
    if (!props.isLoading && props.show && !props.errorMessage) {
      props.handleClose();
      setBody("");
    }
  }, [props.isLoading]);

  return (
    <>
      <Modal
        size="lg"
        centered={true}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            {props.errorMessage && (
              <Alert variant="danger" className="mb-2">{props.errorMessage}</Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Body</Form.Label>
              <Form.Control
                value={body}
                as="textarea"
                //isInvalid={!!inputErrors.name}
                onChange={onInputChange}
                style={{ height: "200px" }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={props.isLoading}
              variant="secondary"
              onClick={props.handleClose}
            >
              Close
            </Button>
            <Button disabled={props.isLoading} type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditPost;
