class Counter extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { counter: 0 };
  }

  onBtnClick = () => {
    const newCounter = this.state.counter + 1;
    this.setState({ counter: newCounter });
  };

  render() {
    return (
      <div>
        <button style={{ marginRight: "10px" }} onClick={this.onBtnClick}>
          {this.props.title}
        </button>
        {this.state.counter}
      </div>
    );
  }
}

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Counter title="Some title" desc="Some desc"></Counter>;
  }
}

const domContainer = document.querySelector("#like_button_container");

ReactDOM.render(React.createElement(MainComponent), domContainer);
