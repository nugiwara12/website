import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

class UsersHandler {
  async GET() {
    try {
      const users = await query({
        query: "SELECT * FROM users ORDER BY id DESC",
        values: [],
      });
      console.log("GET Data:", users); // Log fetched data
      return { status: 200, data: users };
    } catch (error) {
      console.error("GET Error:", error); // Detailed logging
      return { status: 500, error: error.message };
    }
  }

  async POST(data) {
    try {
      const { name, email, password, role } = data;

      // Validate input data
      if (!name || !email || !password || !role) {
        throw new Error("Missing parameters: name, email, password, role");
      }

      // Log the input data
      console.log("POST Data:", data);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Execute the query to insert the user
      const updateUsers = await query({
        query:
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        values: [name, email, hashedPassword, role],
      });

      // Check the result of the query execution
      const result = updateUsers.affectedRows;
      const message = result ? "success" : "error";

      // Log the result and the user data
      const user = { name, email, password: hashedPassword, role };
      console.log("POST Result:", result, user);
      return { status: 200, message, data: user };
    } catch (error) {
      // Log the error with detailed information
      console.error("POST Error:", error.message, error.stack);

      return { status: 500, error: error.message };
    }
  }

  async PUT(data) {
    try {
      const { id, name, email, password, role } = data;
      if (!id || !name || !email || !password || !role) {
        throw new Error(
          "Missing parameters: id, name, email, password, or role"
        );
      }
      console.log("PUT Data:", data); // Log request data

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const updateUsers = await query({
        query:
          "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?",
        values: [name, email, hashedPassword, role, id],
      });
      const result = updateUsers.affectedRows;
      const message = result ? "success" : "error";
      const user = { id, name, email, password: hashedPassword, role };
      console.log("PUT Result:", result, user); // Log result and user data
      return { status: 200, message, data: user };
    } catch (error) {
      console.error("PUT Error:", error); // Detailed logging
      return { status: 500, error: error.message };
    }
  }

  async DELETE(req) {
    try {
      const { id } = req.query; // Get ID from query parameters
      if (!id) {
        throw new Error("Missing parameter: id");
      }
      console.log("DELETE Data:", id); // Log request data
      const deleteUsers = await query({
        query: "DELETE FROM users WHERE id = ?",
        values: [id],
      });
      const result = deleteUsers.affectedRows;
      const message = result ? "success" : "error";
      const user = { id };
      console.log("DELETE Result:", result, user); // Log result and user data
      return { status: 200, message, data: user };
    } catch (error) {
      console.error("DELETE Error:", error); // Detailed logging
      return { status: 500, error: error.message };
    }
  }
}

export default async function handler(req, res) {
  const method = req.method.toUpperCase();
  const requestData = method !== "GET" ? req.body : null;

  console.log("Request Method:", method);
  console.log("Request Data:", requestData); // Log entire request data

  const usersHandler = new UsersHandler(); // Create a new instance of UsersHandler for each request

  if (method === "GET") {
    const { status, data, error } = await usersHandler.GET();
    if (error) {
      res.status(status).json({ error });
    } else {
      res.status(status).json(data);
    }
  } else if (method === "POST") {
    const { status, message, data, error } = await usersHandler.POST(
      requestData
    );
    if (error) {
      res.status(status).json({ error });
    } else {
      res.status(status).json({ message, data });
    }
  } else if (method === "PUT") {
    const { status, message, data, error } = await usersHandler.PUT(
      requestData
    );
    if (error) {
      res.status(status).json({ error });
    } else {
      res.status(status).json({ message, data });
    }
  } else if (method === "DELETE") {
    const { status, message, data, error } = await usersHandler.DELETE(
      req // Pass the entire request object to handle query parameters
    );
    if (error) {
      res.status(status).json({ error });
    } else {
      res.status(status).json({ message, data });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
