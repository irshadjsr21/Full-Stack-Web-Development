import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth";
import config from "../config";

const useLogin = () => {
  const authData = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const startLogin = () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setInputErrors({ name: "", email: "", password: "" });

    axios
      .post(`${config.API_URL}/auth/login`, { email, password })
      .then(res => {
        setSuccessMessage("Login successful.");
        authData.setAccessToken(res.data.token);
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          setErrorMessage(error.response.data.message || "Some error occured.");

          if (error.response.data.error) {
            setInputErrors(error.response.data.error);
          }
        } else {
          setErrorMessage(
            "Cannot reach the server, please check your internet connection."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    inputErrors,
    isLoading,
    errorMessage,
    successMessage,
    startLogin
  };
};

export default useLogin;
