import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

function Post(props) {
  const historyData = useHistory();
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

  const onLike = event => {
    event.stopPropagation();
    props.onLike(props.post._id);
  };
  const onUnlike = event => {
    event.stopPropagation();
    props.onUnlike(props.post._id);
  };

  const onOpen = (event, post) => {
    props.onOpen(post);
  };

  const showUserProfile = event => {
    event.stopPropagation();
    historyData.push("/user/" + props.post.user._id);
  };

  return (
    <Col xs={12}>
      <Card onClick={event => onOpen(event, props.post)} className="mb-4">
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <Button variant="link" onClick={showUserProfile}>
              {props.post.user.name}
            </Button>
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
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {props.post.isLiked && (
                <Button onClick={onUnlike} variant="outline-primary">
                  Unlike
                </Button>
              )}
              {!props.post.isLiked && (
                <Button onClick={onLike} variant="primary">
                  Like
                </Button>
              )}
              <div className="text-muted ms-4">
                <div>Likes: {props.post.likesCount}</div>
                <div>Comments: {props.post.commentsCount}</div>
              </div>
            </div>
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
