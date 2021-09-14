import React, { useContext } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function CustomNavbar() {
  const authData = useContext(AuthContext);
  const history = useHistory();

  const onLogin = () => {
    history.push("/login");
  };

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
            {!authData.isLoggedIn && (
              <Button variant="primary" onClick={onLogin}>
                Login
              </Button>
            )}
            {authData.isLoggedIn && (
              <NavDropdown
                title={authData.userProfile.name}
                id="basic-nav-dropdown"
              >
                <Link className="dropdown-item" to="/profile">My Profile</Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={authData.logoutUser}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
