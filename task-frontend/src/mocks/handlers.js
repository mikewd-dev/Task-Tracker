

import { http, HttpResponse } from "msw";

export const handlers =[
    http.post("http://localhost:4000/tasks", async ({ request }) => {

    const { title, description, status, due_date } = await request.json();

    if (!title || !status || !due_date) {

      return HttpResponse.json(
        { error: "Title, Status and Date are required" },
        { status: 400 }
      );
    }


    return HttpResponse.json(
      {
        id: 1,
        title,
        description,
        status,
        due_date
      },
      { status: 201 }
    );
  })
];