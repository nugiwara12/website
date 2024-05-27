import { query } from "@/lib/db";

class UsersHandler {
  async GET(request, response) {
    try {
      const users = await query({
        query: "SELECT * FROM users",
        values: [],
      });
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async POST(request, response) {
    try {
      const { name, email } = await request.body;
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
      response.status(200).json({
        message: message,
        product: user,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  async PUT(request, response) {
    // Handle PUT request
  }

  async DELETE(request, response) {
    // Handle DELETE request
  }

  handleRequest(request, response) {
    const method = request.method.toUpperCase();
    if (method === "GET") {
      this.GET(request, response);
    } else if (method === "POST") {
      this.POST(request, response);
    } else if (method === "PUT") {
      this.PUT(request, response);
    } else if (method === "DELETE") {
      this.DELETE(request, response);
    } else {
      response.status(405).json({ message: "Method Not Allowed" });
    }
  }
}

const usersHandler = new UsersHandler();

export default function handler(request, response) {
  usersHandler.handleRequest(request, response);
}
