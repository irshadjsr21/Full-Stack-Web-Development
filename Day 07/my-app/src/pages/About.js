import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const About = props => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("ComponentDidMount");
    console.log(props);

    return () => {
      console.log("ComponentWillUnmount");
    };
  }, []);

  useEffect(() => {
    console.log("Count variable changes: " + count);
  }, [count]);

  useEffect(() => {
    console.log("Title changed");
  }, [props.title]);

  useEffect(() => {
    console.log("State or props changed");
  }, [count, props.title]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>About Page</h1>
      <p>{props.title}</p>
      <Button onClick={incrementCount}>Click</Button>
      <div>{count}</div>
    </div>
  );
};

export default About;
