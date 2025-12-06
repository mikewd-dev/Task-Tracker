import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// let tasks = [];
import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
let currentId = 1;


app.get("/tasks", async(req, res) => {
  res.json(tasks);
});

app.post("/tasks", async(req, res) => {
  const { title, description, status, date } = req.body;
  if (!title || !status || !date) {
    return res.status(400).json({ error: "Title, Status and Date are required" });
  }
   try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, status, date) VALUES (?, ?, ?, ?)",
      [title, description, status, date]
    );
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});