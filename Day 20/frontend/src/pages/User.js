import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <div>
      Hello user
    </div>
  );
}

export default User;
