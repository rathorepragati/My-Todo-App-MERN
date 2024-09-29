import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetails";
import { CssBaseline, Container } from "@mui/material";

class App extends Component {
  render() {
    return (
      <Router>
        <CssBaseline />
        <Container>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </Container>
      </Router>
    );
  }
}

export default App;
