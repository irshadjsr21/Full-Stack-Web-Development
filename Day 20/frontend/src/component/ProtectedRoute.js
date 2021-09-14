import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

/**
 * ['/', '/login']
 */

function ProtectedRoute(props) {
  const authData = useContext(AuthContext);
  const history = useHistory();

  const [renderChild, setRenderChild] = useState(false);

  useEffect(() => {
    if (!authData.isLoggedIn) {
      history.push("/login");
    } else {
      setRenderChild(true);
    }
  }, []);

  if (renderChild) {
    return props.children;
  } else {
    return <></>;
  }
}

export default ProtectedRoute;
