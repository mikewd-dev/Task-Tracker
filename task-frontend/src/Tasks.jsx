import React from "react";
import { useState } from "react";


function Tasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [due_date, setDueDate] = useState("");
  const [newTask , setNewTask] = useState(null);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title || !description || !status || !due_date) {
        setError("All fields are required");
        return;
    }
    const newTask = {
      title,
      description,
      status,
      due_date,
    };
    try {
      const response = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      const addedTask = await response.json();
      setNewTask(addedTask);
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
    } catch (error) {
        setError(error.message);
    }



  }

  return (
    <div className="flex flex-col items-center mt-5">
      <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-[60vw] text-left">
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
         className="w-full p-2 h-24 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
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
          {newTask && <p className="text-green-500">Task "{newTask.title}" added!</p>}
{error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Tasks;
