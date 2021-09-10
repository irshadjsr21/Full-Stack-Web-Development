import React, { useEffect, useState, useContext } from "react";
import { Row, Spinner, Pagination, Button } from "react-bootstrap";

import usePost from "../hooks/usePost";
import { AuthContext } from "../context/auth";
import Post from "../component/Post";
import AddPost from "../component/AddPost";
import DeletePost from "../component/DeletePost";
import EditPost from "../component/EditPost";

/**
 * ['/', '/login']
 */

function Home() {
  const postData = usePost();
  const authData = useContext(AuthContext);

  const [showAddPost, setShowAddPost] = useState(false);

  const handleAddPostClose = () => setShowAddPost(false);
  const handleAddPostShow = () => setShowAddPost(true);

  const [deletePostId, setDeletePostId] = useState("");
  const [showDeletePost, setShowDeletePost] = useState(false);

  const handleDeletePostClose = () => setShowDeletePost(false);

  const [editPost, setEditPost] = useState({});
  const [showEditPost, setShowEditPost] = useState(false);

  const handleEditPostClose = () => setShowEditPost(false);

  useEffect(() => {
    postData.getPosts(1);
  }, []);

  const onDeleteClick = postId => {
    setDeletePostId(postId);
    setShowDeletePost(true);
  };

  const onEditClick = post => {
    setEditPost(post);
    setShowEditPost(true);
  };

  const goNext = () => {
    postData.getPosts(postData.currentPage + 1);
  };

  const goPrev = () => {
    postData.getPosts(postData.currentPage - 1);
  };

  const buildPagination = () => {
    const initialPages = [];
    const lastPages = [];

    console.log(postData);

    if (postData.currentPage !== 1) {
      initialPages.push(postData.currentPage - 1);
    }

    initialPages.push(postData.currentPage);

    if (postData.currentPage !== postData.lastPage) {
      initialPages.push(postData.currentPage + 1);

      if (postData.currentPage + 1 !== postData.lastPage) {
        lastPages.push(postData.lastPage);
      }
    }

    if (!lastPages.includes(1) && !initialPages.includes(1)) {
      initialPages.unshift(1);
    }

    return (
      <Pagination>
        <Pagination.Prev
          onClick={goPrev}
          disabled={postData.isLoading || postData.currentPage === 1}
        />
        {initialPages.map(page => (
          <Pagination.Item
            key={page}
            onClick={() => postData.getPosts(page)}
            active={page === postData.currentPage}
            disabled={postData.isLoading}
          >
            {page}
          </Pagination.Item>
        ))}
        {lastPages.length !== 0 && <Pagination.Ellipsis />}
        {lastPages.map(page => (
          <Pagination.Item
            key={page}
            onClick={() => postData.getPosts(page)}
            active={page === postData.currentPage}
            disabled={postData.isLoading}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={goNext}
          disabled={
            postData.isLoading || postData.currentPage === postData.lastPage
          }
        />
      </Pagination>
    );
  };

  return (
    <div className="mt-5">
      <Button className="mb-4" variant="primary" onClick={handleAddPostShow}>
        Add Post
      </Button>

      <DeletePost
        isLoading={postData.isDeleteLoading}
        errorMessage={postData.deleteErrorMessage}
        onSubmit={() => postData.deletePost(deletePostId)}
        show={showDeletePost}
        handleClose={handleDeletePostClose}
      />

      <EditPost
        isLoading={postData.isEditLoading}
        errorMessage={postData.editErrorMessage}
        post={editPost}
        onSubmit={postData.editPost}
        show={showEditPost}
        handleClose={handleEditPostClose}
      />

      <AddPost
        isLoading={postData.isAddLoading}
        errorMessage={postData.addErrorMessage}
        onSubmit={postData.addPost}
        show={showAddPost}
        handleClose={handleAddPostClose}
      />

      {postData.isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!postData.isLoading && (
        <Row>
          {postData.posts.map(post => (
            <Post
              userProfile={authData.userProfile}
              key={post._id}
              post={post}
              onDelete={onDeleteClick}
              onEdit={onEditClick}
            />
          ))}
        </Row>
      )}
      <div className="d-flex justify-content-center mt-4">
        {buildPagination()}
      </div>
    </div>
  );
}

export default Home;
