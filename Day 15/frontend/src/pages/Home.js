import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * ['/', '/login']
 */

function Home() {
  const history = useHistory();

  useEffect(() => {
    history.push("/signup");
  }, []);

  return <div className="d-flex justify-content-center mt-5"></div>;
}

export default Home;
