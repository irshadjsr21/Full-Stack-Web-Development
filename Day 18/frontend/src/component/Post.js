import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";

function Post(props) {
  const formateDate = str => {
    const date = dayjs(str);
    return date.format("h:m A DD MMM YY");
  };

  return (
    <Col xs={12}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <div>{props.post.userId.name}</div>
            {props.userProfile._id === props.post.userId._id && (
              <div>
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={() => props.onEdit(props.post)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => props.onDelete(props.post._id)}
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
