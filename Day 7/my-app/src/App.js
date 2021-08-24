import React from "react";
import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Navbar from "./component/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [title, setTitle] = React.useState("The first title.");

  return (
    <Router>
      <Navbar />
      <Button variant="secondary" onClick={() => setTitle("The second title.")}>
        Change Title
      </Button>

      <Container>
        <Switch>
          <Route path="/about">
            <About title={title} />
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
