import React, { Component } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { getTasks, deleteTask } from "../services/Api";
import { Link } from "react-router-dom";

class TaskList extends Component {
  state = {
    tasks: [],
    searchQuery: "",
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const response = await getTasks();
      const data = response?.data || [];
      this.setState({ tasks: data });
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      this.setState({ tasks: [] });
    }
  };

  handleDelete = async (id) => {
    await deleteTask(id);
    this.fetchTasks();
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  getFilteredTasks = () => {
    const { tasks, searchQuery } = this.state;
    if (!searchQuery) {
      return tasks;
    }
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  render() {
    const { searchQuery } = this.state;
    const filteredTasks = this.getFilteredTasks();

    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Task List
        </Typography>

        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={this.handleSearchChange}
        />

        <Button
          component={Link}
          to="/add"
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Add Task
        </Button>

        {filteredTasks.length > 0 ? (
          <List>
            {filteredTasks.map((task, index) => (
              <ListItem key={task.id ? `${task.id}-${index}` : `task-${index}`}>
                {" "}
                {/* Ensure unique key */}
                <ListItemText primary={task.title} secondary={task.status} />
                <Button
                  component={Link}
                  to={`/task/${task.id}`}
                  variant="contained"
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => this.handleDelete(task.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No tasks found</Typography>
        )}
      </Container>
    );
  }
}

export default TaskList;
