import { query } from "@/lib/db";

class UsersHandler {
  async GET() {
    try {
      const users = await query({
        query: "SELECT * FROM users",
        values: [],
      });
      return { status: 200, data: users };
    } catch (error) {
      return { status: 500, error: error.message };
    }
  }

  async POST(data) {
    try {
      const { name, email } = data;
      const updateUsers = await query({
        query: "INSERT INTO users (name, email) VALUES (?, ?)",
        values: [name, email],
      });
      const result = updateUsers.affectedRows;
      let message = result ? "success" : "error";
      const user = {
        name: name,
        email: email,
      };
      return { status: 200, message: message, data: user };
    } catch (error) {
      return { status: 500, error: error.message };
    }
  }

  async PUT(data) {
    try {
      const { id, name, email } = data;

      if (id === undefined || name === undefined || email === undefined) {
        throw new Error("Missing parameters: id, name, or email");
      }

      const updateUsers = await query({
        query: "UPDATE users SET name = ?, email = ? WHERE id = ?",
        values: [name, email, id],
      });
      const result = updateUsers.affectedRows;
      let message = result ? "success" : "error";
      const user = {
        id: id,
        name: name,
        email: email,
      };
      return { status: 200, message: message, data: user };
    } catch (error) {
      return { status: 500, error: error.message };
    }
  }

  async DELETE(data) {
    try {
      const { id } = data;
      const deleteUsers = await query({
        query: "DELETE FROM users WHERE id = ?",
        values: [id],
      });
      const result = deleteUsers.affectedRows;
      let message = result ? "success" : "error";
      const user = {
        id: id,
      };
      return { status: 200, message: message, data: user };
    } catch (error) {
      return { status: 500, error: error.message };
    }
  }
}

const usersHandler = new UsersHandler();

export default async function handler(request, response) {
  const method = request.method.toUpperCase();
  const requestData = method !== "GET" ? await request.body : null;

  if (method === "GET") {
    const { status, data, error } = await usersHandler.GET();
    if (error) {
      response.status(status).json({ error: error });
    } else {
      response.status(status).json(data);
    }
  } else if (method === "POST") {
    const { status, message, data, error } = await usersHandler.POST(
      requestData
    );
    if (error) {
      response.status(status).json({ error: error });
    } else {
      response.status(status).json({ message: message, data: data });
    }
  } else if (method === "PUT") {
    const { status, message, data, error } = await usersHandler.PUT(
      requestData
    );
    if (error) {
      response.status(status).json({ error: error });
    } else {
      response.status(status).json({ message: message, data: data });
    }
  } else if (method === "DELETE") {
    const { status, message, data, error } = await usersHandler.DELETE(
      requestData
    );
    if (error) {
      response.status(status).json({ error: error });
    } else {
      response.status(status).json({ message: message, data: data });
    }
  } else {
    response.status(405).json({ message: "Method Not Allowed" });
  }
}
