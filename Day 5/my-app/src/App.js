import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Title from "./Title";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "Reactjs", showTitle: true };
  }

  onClickBtn = () => {
    this.setState({ showTitle: false });
  }

  render() {
    console.log("Render app.js");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {this.state.showTitle && <Title text={this.state.title}></Title>}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
