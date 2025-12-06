import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tasks from "./Tasks";
import{ server } from "./mocks/server";
import { http, HttpResponse } from "msw";




test("new task successfully added", async () => {
  render(<Tasks />);
  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Test Task" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "This is a test task" },
  });
  fireEvent.change(screen.getByLabelText(/Status/i), {
    target: { value: "completed" },
  });
  fireEvent.change(screen.getByLabelText(/Due Date/i), {
    target: { value: "2024-12-31T23:59" },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
  await waitFor(() =>
    expect(screen.getByText(/Task "Test Task" added!/i)).toBeInTheDocument()
  );
});

test("handles server error on adding task", async () => {
  server.use(
    http.post("http://localhost:4000/tasks", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Tasks />);
  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Test Task" },
  });
  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "This is a test task" },
  });
  fireEvent.change(screen.getByLabelText(/Status/i), {
    target: { value: "completed" },
  });
  fireEvent.change(screen.getByLabelText(/Due Date/i), {
    target: { value: "2024-12-31T23:59" },
  });
  fireEvent.click(screen.getByText(/Add Task/i));
 await waitFor(() =>
  expect(screen.getByText(/Failed to add task/i)).toBeInTheDocument()
);

});
