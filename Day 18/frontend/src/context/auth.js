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
        userProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
