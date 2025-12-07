import React, { useState } from "react";

function Tasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [due_date, setDueDate] = useState("");
  const [newTask, setNewTask] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !status || !due_date) {
      setError("Title, Status, and Due Date are required");
      return;
    }

    const taskData = { title, description, status, due_date };

    try {
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const addedTask = await response.json();
console.log(addedTask);
      setNewTask(addedTask);

      // reset form fields
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[60vw] text-left"
      >
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="w-full p-2 h-24 border rounded"
        />

        <label htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          type="datetime-local"
          value={due_date}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label htmlFor="task-status">Status</label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {newTask && (
        <div className="mt-6 p-4 border rounded bg-green-50 w-[60vw]">
          <h3 className="font-bold text-green-700 mb-2">
            Task "{newTask.title}" added successfully!
          </h3>
<p className="text-green-900"><strong>Description:</strong> {newTask.description || "None"}</p>
<p className="text-green-900"><strong>Status:</strong> {newTask.status}</p>
<p className="text-green-900"><strong>Due Date:</strong> {new Date(newTask.due_date).toLocaleString()}</p>

        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Tasks;
