import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Navbar from "./component/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Container>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
