import React, { Component } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";
import { createTask, updateTask } from "../services/Api";
import withRouter from "../utils/withRouter";

const statusOptions = ["pending", "in progress", "completed"];

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      status: "pending",
      errors: {},
    };
  }

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      this.setState({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const errors = {};
    const { title, description } = this.state;
    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { title, description, status } = this.state;
      const taskData = { title, description, status };
      const { task, navigate } = this.props;

      try {
        if (task) {
          await updateTask(task.id, taskData);
        } else {
          await createTask(taskData);
        }
        navigate("/");
      } catch (error) {
        console.error("Error saving task", error);
      }
    }
  };

  handleBack = () => {
    const { navigate } = this.props;
    navigate("/");
  };

  render() {
    const { title, description, status, errors } = this.state;

    return (
      <Container>
        <Typography variant="h5">
          {this.props.task ? "Edit Task" : "Create Task"}
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            label="Status"
            name="status"
            value={status}
            onChange={this.handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            {this.props.task ? "Edit Task" : "Add Task"}
          </Button>

          {/* Back button */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.handleBack}
            style={{ marginLeft: "10px" }}
          >
            Back to Task List
          </Button>
        </form>
      </Container>
    );
  }
}

export default withRouter(TaskForm);
