import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import useSignup from "../hooks/useSignup";

function Signup() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    inputErrors,
    isLoading,
    errorMessage,
    successMessage,
    startSignup
  } = useSignup();

  const onInputChange = (key, event) => {
    switch (key) {
      case "name":
        setName(event.target.value);
        break;
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

    startSignup();
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Sign up</Card.Title>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                isInvalid={!!inputErrors.name}
                onChange={event => onInputChange("name", event)}
                type="text"
                placeholder="Enter your name"
              />
              {inputErrors.name && (
                <Form.Text className="text-danger">
                  {inputErrors.name}
                </Form.Text>
              )}
            </Form.Group>

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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
            Already have an account? <Link to="/login">Login</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
