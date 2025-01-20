// App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('ToDo App', () => {
  test("renders input and add button", () => {
    render(<App />);
  
    // Проверка наличия поля ввода и кнопки "Add"
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    expect(input).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  
  test("adds a new task when input is not empty", () => {
    render(<App />);
  
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
  
    const task = screen.getByText("New Task");
    expect(task).toBeInTheDocument();
  });
  
  test("toggles task completion on checkbox click", () => {
    render(<App />);
  
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
  
    const checkbox = screen.getByLabelText("Task 1");
    expect(checkbox).not.toBeChecked();
  
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
  
  test("deletes a task when delete button is clicked", () => {
    render(<App />);
  
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    fireEvent.change(input, { target: { value: "Task to delete" } });
    fireEvent.click(addButton);
  
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument();
  
    fireEvent.click(deleteButton);
    const task = screen.queryByText("Task to delete");
  
    expect(task).not.toBeInTheDocument();
  });
  
  test("filters tasks based on selected filter", () => {
    render(<App />);
  
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
  
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
  
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);
  
    const checkbox = screen.getByLabelText("Task 1");
    fireEvent.click(checkbox); // Mark Task 1 as completed
  
    const pendingButton = screen.getByText("Pending");
    fireEvent.click(pendingButton);
  
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  
    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);
  
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });
  
});
