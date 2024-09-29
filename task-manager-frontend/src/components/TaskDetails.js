import React, { Component } from "react";
import { getTask } from "../services/Api";
import TaskForm from "./TaskForm";
import withRouter from "../utils/withRouter";

class TaskDetails extends Component {
  state = {
    task: null,
  };

  async componentDidMount() {
    const { id } = this.props.params; // Access the task ID from the URL params
    const { data } = await getTask(id);
    this.setState({ task: data });
  }

  render() {
    const { task } = this.state;
    return task ? <TaskForm task={task} /> : <p>Loading...</p>;
  }
}

export default withRouter(TaskDetails);
