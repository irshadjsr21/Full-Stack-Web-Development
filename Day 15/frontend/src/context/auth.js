import React, { useEffect, useState } from "react";

// This is a context
export const AuthContext = React.createContext({ isLoggedIn: false });

// This is a component
export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
