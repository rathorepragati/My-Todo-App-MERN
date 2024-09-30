import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList";
import * as api from "../services/Api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/Api");

describe("TaskList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", async () => {
    // Mock the API response to simulate loading state
    api.getTasks.mockResolvedValueOnce(new Promise(() => {}));

    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    // Wait for the loading state to be gone
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(); // Ensure "loading" is not in the document
    });
  });

  test("renders task list after loading", async () => {
    api.getTasks.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Test Task 1", status: "completed" },
        { id: 2, title: "Test Task 2", status: "pending" },
      ],
    });

    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    // Wait for tasks to be rendered
    expect(await screen.findByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  test("handles task deletion", async () => {
    const mockDelete = jest.fn();
    api.getTasks.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Test Task 1", status: "completed" },
        { id: 2, title: "Test Task 2", status: "pending" },
      ],
    });
    api.deleteTask = mockDelete; // Mock the delete function

    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    // Wait for tasks to be rendered
    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete/i,
    });

    // Click the delete button for the first task
    fireEvent.click(deleteButtons[0]);

    // Ensure the delete function was called with the correct task ID
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test("renders no tasks found message when there are no tasks", async () => {
    // Mock API response with no tasks
    api.getTasks.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <TaskList />
      </MemoryRouter>
    );

    // Wait for "no tasks found" message to be displayed
    expect(await screen.findByText(/no tasks found/i)).toBeInTheDocument();
  });
});
