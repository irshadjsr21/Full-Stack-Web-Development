import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";

function Post(props) {
  const formateDate = str => {
    const date = dayjs(str);
    return date.format("h:m A DD MMM YY");
  };

  const onEdit = (event, post) => {
    event.stopPropagation();
    props.onEdit(post);
  };

  const onDelete = (event, post) => {
    event.stopPropagation();
    props.onDelete(post._id);
  };

  const onOpen = (event, post) => {
    props.onOpen(post);
  };

  return (
    <Col xs={12}>
      <Card onClick={event => onOpen(event, props.post)} className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <div>{props.post.user.name}</div>
            {props.userProfile._id === props.post.user._id && (
              <div>
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={event => onEdit(event, props.post)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={event => onDelete(event, props.post)}
                >
                  Delete
                </Button>
              </div>
            )}
          </Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>
            {props.post.body}
          </Card.Text>
          <div className="d-flex justify-content-end">
            <small className="text-muted">
              {formateDate(props.post.createdAt)}
            </small>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Post;
