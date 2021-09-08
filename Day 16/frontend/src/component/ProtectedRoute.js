import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

/**
 * ['/', '/login']
 */

function ProtectedRoute(props) {
  const authData = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!authData.isLoggedIn) {
      history.push("/login");
    }
  }, []);

  return props.children;
}

export default ProtectedRoute;

