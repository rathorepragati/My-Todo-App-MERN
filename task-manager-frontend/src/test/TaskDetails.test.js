import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDetails from "../components/TaskDetails";
import { getTask } from "../services/Api";
import { MemoryRouter } from "react-router-dom";

// Mock the getTask function from the Api module
jest.mock("../services/Api");

describe("TaskDetails Component", () => {
  const mockTask = {
    title: "Test Task",
    description: "This is a test task",
    status: "pending",
  };

  beforeEach(() => {
    // Mock the API response
    getTask.mockResolvedValueOnce({ data: mockTask });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading initially", () => {
    render(
      <MemoryRouter initialEntries={["/task/1"]}>
        <TaskDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders task details after loading", async () => {
    render(
      <MemoryRouter initialEntries={["/task/1"]}>
        <TaskDetails />
      </MemoryRouter>
    );

    // Use findByDisplayValue to automatically wait for the task details to appear
    expect(await screen.findByDisplayValue(mockTask.title)).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(mockTask.description)
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(mockTask.status)
    ).toBeInTheDocument();
  });
});
