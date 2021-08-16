class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  saveToStorage = () => {
    const taskList = JSON.stringify(this.state.tasks);
    localStorage.setItem('taskList', taskList);
  }

  getFromStorage = () => {
    const taskList = localStorage.getItem('taskList');
    this.setState({ tasks: JSON.parse(taskList) });
  }

  componentDidUpdate() {
    this.saveToStorage();
  }

  componentDidMount() {
    this.getFromStorage();
  }

  onDelete = index => {
    this.setState(prevState => {
      const newTasks = [...prevState.tasks];
      newTasks.splice(index, 1);

      return {
        tasks: newTasks
      };
    });
  };

  onAdd = (title, desc) => {
    this.setState(prevState => {
      const newTasks = [{ title: title, desc: desc }, ...prevState.tasks];

      return {
        tasks: newTasks
      };
    });
    console.log(title, desc);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <main className="container">
          <AddContainer onAdd={this.onAdd}></AddContainer>
          <TaskList
            onDelete={this.onDelete}
            tasks={this.state.tasks}
          ></TaskList>
        </main>
      </React.Fragment>
    );
  }
}

const domContainer = document.querySelector("#app");

ReactDOM.render(React.createElement(MainComponent), domContainer);
