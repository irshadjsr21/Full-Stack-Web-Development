import React, { useEffect, useState, useContext } from "react";
import querystring from "querystring";
import axios from "axios";
import { AuthContext } from "../context/auth";

const itemsPerPage = 5;

const usePost = () => {
  const authData = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddLoading, setIsAddLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const [isEditLoading, setIsEditLoading] = useState(false);
  const [editErrorMessage, setEditErrorMessage] = useState("");

  const addPost = async body => {
    setIsAddLoading(true);
    setAddErrorMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/post",
        { body },
        {
          headers: { Authorization: "Bearer " + authData.accessToken }
        }
      );

      const newPost = res.data.post;
      newPost.userId = {
        _id: authData.userProfile._id,
        name: authData.userProfile.name
      };

      const newList = [newPost, ...posts];

      setPosts(newList);
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

  const editPost = async (postId, body) => {
    setIsEditLoading(true);
    setEditErrorMessage("");

    try {
      const res = await axios.patch(
        "http://localhost:5000/post/" + postId,
        { body },
        {
          headers: { Authorization: "Bearer " + authData.accessToken }
        }
      );

      const newPost = res.data.post;
      newPost.userId = {
        _id: authData.userProfile._id,
        name: authData.userProfile.name
      };

      const newList = [...posts];

      const index = newList.findIndex(elem => elem._id === newPost._id);

      if (index !== -1) {
        newList[index] = newPost;
      }

      setPosts(newList);
    } catch (error) {
      if (error.response) {
        setEditErrorMessage(
          error.response.data.message || "Some error occured."
        );
      } else {
        setEditErrorMessage(
          "Cannot reach the server, please check your internet connection."
        );
      }
    } finally {
      setIsEditLoading(false);
    }
  };

  const deletePost = async postId => {
    setIsDeleteLoading(true);
    setDeleteErrorMessage("");

    try {
      await axios.delete("http://localhost:5000/post/" + postId, {
        headers: { Authorization: "Bearer " + authData.accessToken }
      });

      const newList = posts.filter(elem => elem._id !== postId);

      setPosts(newList);
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

  const getPosts = async page => {
    setCurrentPage(page);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const query = querystring.stringify({ page, itemsPerPage });
      const res = await axios.get("http://localhost:5000/post?" + query, {
        headers: { Authorization: "Bearer " + authData.accessToken }
      });

      setPosts(res.data.posts);
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

  return {
    getPosts,
    posts,
    isLoading,
    errorMessage,
    currentPage,
    lastPage,
    addPost,
    isAddLoading,
    addErrorMessage,
    deletePost,
    isDeleteLoading,
    deleteErrorMessage,
    editPost,
    isEditLoading,
    editErrorMessage
  };
};

export default usePost;
