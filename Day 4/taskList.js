class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div id="task-list" className="row g-2">
        {/* <p className="text-center">There are no tasks</p>*/}

        {this.props.tasks.length === 0 && (
          <p className="text-center">There are no tasks.</p>
        )}

        {this.props.tasks.map((task, index) => {
          return (
            <TaskCard
              key={index}
              onDelete={this.props.onDelete}
              index={index}
              title={task.title}
              desc={task.desc}
            ></TaskCard>
          );
        })}
      </div>
    );
  }
}
