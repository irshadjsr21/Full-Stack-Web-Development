class TaskCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">{this.props.title}</h6>
            <p>{this.props.desc}</p>
            <button
              data-task-index="${index}"
              className="btn btn-danger me-2"
              onClick={() => this.props.onDelete(this.props.index)}
            >
              Delete
            </button>
            <button data-task-index="${index}" className="btn btn-secondary">
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
