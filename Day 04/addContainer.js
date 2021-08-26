class AddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', desc: '' };
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onDescChange = (event) => {
    this.setState({ desc: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state.title, this.state.desc);
    this.setState({ title: '', desc: '' });
  }

  render() {
    return (
      <form id="add-task-form" className="row my-5" onSubmit={this.onSubmit}>
        <div className="col-5">
          <input
            required
            autoComplete="off"
            id="add-task-input-title"
            type="text"
            placeholder="Title"
            className="form-control"
            onChange={this.onTitleChange}
            value={this.state.title}
          />
        </div>

        <div className="col-5">
          <input
            required
            autoComplete="off"
            id="add-task-input-desc"
            type="text"
            placeholder="Description"
            className="form-control"
            onChange={this.onDescChange}
            value={this.state.desc}
          />
        </div>

        <div className="col-2">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    );
  }
}
