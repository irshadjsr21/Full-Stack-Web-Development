import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Navbar from "./component/Navbar";
import { AuthContextProvider } from "./context/auth";
import ProtectedRoute from "./component/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />

        <Container>
          <Switch>
            <Route path="/user/:userId">
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            </Route>

            <Route path="/profile">
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Route>
          </Switch>
        </Container>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
