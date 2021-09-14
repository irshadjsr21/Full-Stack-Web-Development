import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// This is a context
export const AuthContext = React.createContext({ isLoggedIn: false });

// This is a component
export const AuthContextProvider = props => {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userProfile, setUserProfile] = useState({});

  const [isBioLoading, setIsBioLoading] = useState(false);
  const [bioErrorMessage, setBioErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("http://localhost:5000/user/profile", {
          headers: { Authorization: "Bearer " + accessToken }
        })
        .then(res => {
          setUserProfile(res.data.user);
          localStorage.setItem("token", accessToken);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setAccessToken("");
        });
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const changeBio = newBio => {
    setIsBioLoading(true);
    setBioErrorMessage("");

    axios
      .patch(
        "http://localhost:5000/user/bio",
        { bio: newBio },
        {
          headers: { Authorization: "Bearer " + accessToken }
        }
      )
      .then(res => {
        setUserProfile(res.data.user);
      })
      .catch(error => {
        if (error.response) {
          setBioErrorMessage(
            error.response.data.message || "Some error occured."
          );
        } else {
          setBioErrorMessage(
            "Cannot reach the server, please check your internet connection."
          );
        }
      })
      .finally(() => {
        setIsBioLoading(false);
      });
  };

  const logoutUser = () => {
    setAccessToken("");
    history.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        accessToken,
        setAccessToken,
        logoutUser,
        userProfile,
        changeBio,
        isBioLoading,
        bioErrorMessage
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
