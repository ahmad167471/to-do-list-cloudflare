const todos = new Map();  // key = id (string), value = {id, text}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle OPTIONS (preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /api → list all todos
    if (request.method === "GET" && pathname === "/api") {
      const list = Array.from(todos.values());
      return Response.json(list, { headers: corsHeaders });
    }

    // POST /api → create todo
    if (request.method === "POST" && pathname === "/api") {
      try {
        const { text } = await request.json();
        if (!text || typeof text !== "string" || text.trim() === "") {
          return new Response("Invalid task", { status: 400, headers: corsHeaders });
        }

        const id = crypto.randomUUID();
        const todo = { id, text: text.trim() };
        todos.set(id, todo);

        return Response.json(todo, {
          status: 201,
          headers: corsHeaders,
        });
      } catch (err) {
        return new Response("Bad request", { status: 400, headers: corsHeaders });
      }
    }

    // DELETE /api/:id
    if (request.method === "DELETE" && pathname.startsWith("/api/")) {
      const id = pathname.slice(5);
      if (todos.delete(id)) {
        return new Response(null, { status: 204, headers: corsHeaders });
      }
      return new Response("Not found", { status: 404, headers: corsHeaders });
    }

    // 404 for everything else
    return new Response("Not found", { status: 404, headers: corsHeaders });
  }
};