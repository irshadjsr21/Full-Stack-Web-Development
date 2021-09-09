import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function DeletePost(props) {
  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit();
  };

  useEffect(() => {
    if (!props.isLoading && props.show && !props.errorMessage) {
      props.handleClose();
    }
  }, [props.isLoading]);


  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            Are you sure you want to delete this post?
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={props.isLoading}
              variant="secondary"
              onClick={props.handleClose}
            >
              Close
            </Button>
            <Button disabled={props.isLoading} type="submit" variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DeletePost;
