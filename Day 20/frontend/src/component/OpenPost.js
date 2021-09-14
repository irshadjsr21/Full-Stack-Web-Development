import React, { useEffect, useState } from "react";
import { Button, Modal, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import dayjs from "dayjs";

import Comment from "./Comment";
import AddComment from "./AddComment";
import useComment from "../hooks/useComment";

function OpenPost(props) {
  const {
    isLoading,
    errorMessage,
    comments,
    getComments,
    resetAll,
    currentPage,
    lastPage,
    isAddLoading,
    addComment,
    addErrorMessage,
    deleteComment
  } = useComment();

  const formateDate = str => {
    const date = dayjs(str);
    return date.format("h:m A DD MMM YY");
  };

  useEffect(() => {
    if (props.show) {
      resetAll();
      getComments(props.post._id, 1, true);
    }
  }, [props.show]);

  const loadMore = () => {
    getComments(props.post._id, currentPage + 1, false);
  };

  const onSubmit = body => {
    console.log(body);
    addComment(props.post._id, body);
  };

  const onEdit = () => {
    console.log("Edit is not handled");
  };

  const onDelete = id => {
    deleteComment(id);
  };

  const onLike = event => {
    event.stopPropagation();
    props.onLike(props.post._id);
  };

  const onUnlike = event => {
    event.stopPropagation();
    props.onUnlike(props.post._id);
  };

  return (
    <>
      <Modal
        size="lg"
        centered={true}
        scrollable={true}
        show={props.show}
        onHide={props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.show && (
            <Row>
              <Col xs={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <div>{props.post.user.name}</div>
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
            </Row>
          )}
          <div className="d-flex justify-content-center mb-2">
            <div className="text-muted">Comments</div>
          </div>
          {props.show && (
            <>
              <AddComment
                isLoading={isAddLoading}
                errorMessage={addErrorMessage}
                onSubmit={onSubmit}
              />

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Row justify="center">
                {comments.map(comment => (
                  <Comment
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={comment._id}
                    comment={comment}
                  />
                ))}
              </Row>

              {comments.length === 0 && !isLoading && (
                <div className="d-flex justify-content-center mb-2 mt-2">
                  <div>No comments</div>
                </div>
              )}

              {isLoading && (
                <div className="d-flex justify-content-center mb-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              <div className="d-grid gap-2">
                <Button
                  disabled={isLoading || currentPage >= lastPage}
                  onClick={loadMore}
                  variant="outline-primary"
                >
                  Load more...
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OpenPost;
