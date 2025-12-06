import request from "supertest";
import { app, pool } from "./server";

afterAll(async () => {
await pool.end();
});

describe("POST /tasks", () => {
  it("should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "This is a test description",
        status: "pending",
        due_date: "2024-12-31T23:59:59"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
  });

  it("fails to create when title is missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "",
        description: "This is a test description",
        status: "pending",
        due_date: "2024-12-31T23:59:59"
      });
    expect(response.statusCode).toBe(400);
  });

  it("fails to create task when status is missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "This is a test description",
        status: "",
        due_date: "2024-12-31T23:59:59"
      });
    expect(response.statusCode).toBe(400);
  });

  it("fails to create task when due_date is missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "This is a test description",
        status: "pending",
        due_date: ""
      });
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({
        description: "Missing title, status, and due_date"
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});

