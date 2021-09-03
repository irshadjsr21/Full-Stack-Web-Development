import React from "react";
import { Card, Form, Button } from "react-bootstrap";

function Home() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Sign up</Card.Title>
          <Form className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <Card.Text className="text-center text-muted mt-2">
            Already have an account? Login
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
