import React, { useEffect, useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputErrors, setInputErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const startSignup = () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setInputErrors({ name: "", email: "", password: "" });

    axios
      .post("http://localhost:5000/auth/signup", { name, email, password })
      .then(res => {
        console.log(res.data);
        setSuccessMessage("Signup successful.");
      })
      .catch(error => {
        console.error(error);
        console.log(error.isAxiosError);
        console.log(error.response);
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
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    inputErrors,
    isLoading,
    errorMessage,
    successMessage,
    startSignup
  };
};

export default useSignup;
