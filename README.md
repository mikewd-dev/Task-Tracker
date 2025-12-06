# Task Tracker App

A simple full-stack Task Tracker application built with React (frontend) and Node.js (backend) using a MySQL database. Users can add, update, and manage tasks with a status and due date.

## Project Structure

- task-frontend/ – React frontend
- task-backend/ – Node.js/Express backend

## Tech Stack

- **Frontend:** React, TailwindCSS, Vite, Testing Library, MSW for mocking API requests
- **Backend:** Node.js, Express, MySQL, REST API
- **Testing:** Vitest (frontend), Jest (backend)

## Setup

Clone the repository:

git clone https://github.com/mikewd-dev/Task-Tracker.git


### Frontend

cd task-frontend
npm install
npm run dev


### Backend

cd task-backend
npm install
npm run dev


## API Endpoints (Backend)

### Create a Task

**POST /tasks**

Request Body:

{
"title": "Task Title",
"description": "Task Description",
"status": "pending|in-progress|completed",
"due_date": "YYYY-MM-DDTHH:mm"
}


Success Response (201):

{
"id": 1,
"title": "Task Title",
"description": "Task Description",
"status": "pending",
"due_date": "2024-12-31T23:59"
}


Error Response (400):

{
"error": "Title, Status and Date are required"
}


### Get Tasks

**GET /tasks**

Success Response (200):

[
{
"id": 1,
"title": "Task Title",
"description": "Task Description",
"status": "pending",
"due_date": "2024-12-31T23:59"
}
]


## Testing

### Frontend

- Uses Vitest + @testing-library/react
- Mock API requests with MSW
- Test files: task-frontend/src/*.test.jsx

Run tests:



npm run test


### Backend

- Uses Jest
- Test files: task-backend/tests/

Run tests:



npm run test


## More Info

For detailed setup and usage, see the individual README files inside `task-frontend/` and `task-backend/`.

