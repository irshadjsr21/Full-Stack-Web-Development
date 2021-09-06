import React, { useContext, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function CustomNavbar() {
  const authData = useContext(AuthContext);

  useEffect(() => {
    console.log(authData);
  }, [authData]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Social Media</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>

          <Nav>
            {!authData.isLoggedIn && <Button variant="primary">Login</Button>}
            {authData.isLoggedIn && <Button variant="primary">Logout</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
