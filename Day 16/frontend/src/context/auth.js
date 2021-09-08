import React, { useEffect, useState } from "react";

// This is a context
export const AuthContext = React.createContext({ isLoggedIn: false });

// This is a component
export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  const logoutUser = () => {
    setAccessToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, setAccessToken, logoutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
