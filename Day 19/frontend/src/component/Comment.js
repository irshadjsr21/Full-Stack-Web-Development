import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";

import { AuthContext } from "../context/auth";

function Comment(props) {
  const { userProfile } = useContext(AuthContext);

  const formateDate = str => {
    const date = dayjs(str);
    return date.format("h:m A DD MMM YY");
  };

  const onEdit = (event, comment) => {
    console.log(event);
    //event.stopPropagation();
    props.onEdit(comment);
  };

  const onDelete = (event, comment) => {
    console.log(event);
    //event.stopPropagation();
    props.onDelete(comment._id);
  };

  return (
    <Col xs={12}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <div>{props.comment.userId.name}</div>
            {userProfile._id === props.comment.userId._id && (
              <div>
                <Button
                  className="me-2"
                  variant="secondary"
                  onClick={event => onEdit(event, props.comment)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={event => onDelete(event, props.comment)}
                >
                  Delete
                </Button>
              </div>
            )}
          </Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>
            {props.comment.body}
          </Card.Text>
          <div className="d-flex justify-content-end">
            <small className="text-muted">
              {formateDate(props.comment.createdAt)}
            </small>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Comment;
