import React, { useEffect, useState, useContext } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import useLogin from "../hooks/useLogin";

function Login() {
  const authData = useContext(AuthContext);

  const {
    email,
    setEmail,
    password,
    setPassword,
    inputErrors,
    isLoading,
    errorMessage,
    successMessage,
    startLogin
  } = useLogin();

  useEffect(() => {
    if (successMessage) {
      authData.setIsLoggedIn(true);
    }
  }, [successMessage]);

  const onInputChange = (key, event) => {
    switch (key) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = event => {
    event.preventDefault();

    startLogin();
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                isInvalid={!!inputErrors.email}
                onChange={event => onInputChange("email", event)}
                type="email"
                placeholder="Enter email"
              />
              {inputErrors.email && (
                <Form.Text className="text-danger">
                  {inputErrors.email}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                isInvalid={!!inputErrors.password}
                onChange={event => onInputChange("password", event)}
                type="password"
                placeholder="Password"
              />
              {inputErrors.password && (
                <Form.Text className="text-danger">
                  {inputErrors.password}
                </Form.Text>
              )}
            </Form.Group>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}

            <Button disabled={isLoading} variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <Card.Text className="text-center text-muted mt-2">
            Don't have an account? <Link to="/signup">Signup</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
