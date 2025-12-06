import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// let tasks = [];
import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



app.get("/tasks", async(req, res) => {
 try {
    const [rows] = await pool.query("SELECT * FROM tasks");
 res.json(rows);
 } catch (err) {

 }
});

app.post("/tasks", async(req, res) => {
  const { title, description, status, due_date } = req.body;
  if (!title || !status || !due_date) {
    return res.status(400).json({ error: "Title, Status and Date are required" });
  }
   try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, status, due_date) VALUES (?, ?, ?, ?)",
      [title, description, status, due_date]
    );
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { app, pool };

if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
}
