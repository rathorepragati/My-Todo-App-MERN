import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import * as api from "../services/Api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/Api");

describe("TaskForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for rendering the "Create Task" form
  test("renders form for creating a task", () => {
    render(
      <MemoryRouter>
        <TaskForm />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /create task/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  // Test for handling input changes (simulating user input)
  test("handles input changes correctly", () => {
    render(
      <MemoryRouter>
        <TaskForm />
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Task" } });
    expect(titleInput.value).toBe("New Task");
  });

  // Test for form validation when title is missing
  test("validates required fields", async () => {
    render(
      <MemoryRouter>
        <TaskForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check for validation error message for title
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  // Test for handling errors on form submission
  test("handles errors on submission", async () => {
    api.createTask.mockRejectedValueOnce(new Error("Error saving task")); // Mock an error from API

    render(
      <MemoryRouter>
        <TaskForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Task Description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));

    // Check if the error message is displayed after failed submission
    expect(await screen.findByText(/error saving task/i)).toBeInTheDocument();
  });
});
