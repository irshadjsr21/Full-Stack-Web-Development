import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditBio(props) {
  const [bio, setBio] = useState("");

  const onInputChange = event => {
    setBio(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(bio);
  };

  useEffect(() => {
    if (props.show) {
      setBio(props.bio);
    }
  }, [props.show]);

  useEffect(() => {
    if (!props.isLoading && props.show && !props.errorMessage) {
      props.handleClose();
      setBio('');
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
          <Modal.Title>Edit Bio</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="editBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                value={bio}
                as="textarea"
                //isInvalid={!!inputErrors.name}
                onChange={onInputChange}
                style={{ height: "100px" }}
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

export default EditBio;
