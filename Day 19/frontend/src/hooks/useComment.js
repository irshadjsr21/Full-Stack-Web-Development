import React, { useEffect, useState, useContext } from "react";
import querystring from "querystring";
import axios from "axios";
import { AuthContext } from "../context/auth";

const itemsPerPage = 5;

const useComment = () => {
  const authData = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddLoading, setIsAddLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  //const [isEditLoading, setIsEditLoading] = useState(false);
  //const [editErrorMessage, setEditErrorMessage] = useState("");

  const addComment = async (postId, body) => {
    setIsAddLoading(true);
    setAddErrorMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/post/comment/" + postId,
        { body },
        {
          headers: { Authorization: "Bearer " + authData.accessToken }
        }
      );

      const newComment = res.data.comment;
      newComment.userId = {
        _id: authData.userProfile._id,
        name: authData.userProfile.name
      };

      const newList = [newComment, ...comments];

      setComments(newList);
    } catch (error) {
      if (error.response) {
        setAddErrorMessage(
          error.response.data.message || "Some error occured."
        );
      } else {
        setAddErrorMessage(
          "Cannot reach the server, please check your internet connection."
        );
      }
    } finally {
      setIsAddLoading(false);
    }
  };

  //const editPost = async (postId, body) => {
  //setIsEditLoading(true);
  //setEditErrorMessage("");

  //try {
  //const res = await axios.patch(
  //"http://localhost:5000/post/" + postId,
  //{ body },
  //{
  //headers: { Authorization: "Bearer " + authData.accessToken }
  //}
  //);

  //const newPost = res.data.post;
  //newPost.userId = {
  //_id: authData.userProfile._id,
  //name: authData.userProfile.name
  //};

  //const newList = [...comments];

  //const index = newList.findIndex(elem => elem._id === newPost._id);

  //if (index !== -1) {
  //newList[index] = newPost;
  //}

  //setComments(newList);
  //} catch (error) {
  //if (error.response) {
  //setEditErrorMessage(
  //error.response.data.message || "Some error occured."
  //);
  //} else {
  //setEditErrorMessage(
  //"Cannot reach the server, please check your internet connection."
  //);
  //}
  //} finally {
  //setIsEditLoading(false);
  //}
  //};

  const deleteComment = async commentId => {
    setIsDeleteLoading(true);
    setDeleteErrorMessage("");

    try {
      await axios.delete("http://localhost:5000/post/comment/" + commentId, {
        headers: { Authorization: "Bearer " + authData.accessToken }
      });

      const newList = comments.filter(elem => elem._id !== commentId);

      setComments(newList);
    } catch (error) {
      if (error.response) {
        setDeleteErrorMessage(
          error.response.data.message || "Some error occured."
        );
      } else {
        setDeleteErrorMessage(
          "Cannot reach the server, please check your internet connection."
        );
      }
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const getComments = async (postId, page, replaceExisting = true) => {
    setCurrentPage(page);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const query = querystring.stringify({ page, itemsPerPage });
      const res = await axios.get(
        "http://localhost:5000/post/comment/" + postId + "?" + query,
        {
          headers: { Authorization: "Bearer " + authData.accessToken }
        }
      );

      if (replaceExisting) {
        setComments(res.data.comments);
      } else {
        const newList = [...comments, ...res.data.comments];
        setComments(newList);
      }
      setLastPage(res.data.totalPages);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Some error occured.");
      } else {
        setErrorMessage(
          "Cannot reach the server, please check your internet connection."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    setComments([]);
    setIsLoading(false);
    setErrorMessage("");
    setCurrentPage(1);
    setLastPage(1);
  };

  return {
    getComments,
    comments,
    isLoading,
    errorMessage,
    currentPage,
    lastPage,
    resetAll,
    addComment,
    addErrorMessage,
    isAddLoading,
    deleteComment,
    deleteErrorMessage,
    isDeleteLoading
  };
};

export default useComment;
