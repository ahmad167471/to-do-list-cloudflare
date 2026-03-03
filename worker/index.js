export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  }
};

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // GET /api → list all todos
    if (request.method === "GET" && pathname === "/api") {
      const keys = await env.TODOS_NEW.list(); // get all keys
      const todos = [];

      for (const keyObj of keys.keys) {
        const value = await env.TODOS_NEW.get(keyObj.name);
        if (value) todos.push(JSON.parse(value));
      }

      return new Response(JSON.stringify(todos), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // POST /api → create a todo
    if (request.method === "POST" && pathname === "/api") {
      const { text } = await request.json();
      if (!text || typeof text !== "string" || text.trim() === "") {
        return new Response(JSON.stringify({ error: "Invalid task" }), { status: 400, headers: corsHeaders });
      }

      const id = crypto.randomUUID();
      const todo = { id, text: text.trim() };
      await env.TODOS_NEW.put(id, JSON.stringify(todo));

      return new Response(JSON.stringify(todo), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // DELETE /api/:id → remove a todo
    if (request.method === "DELETE" && pathname.startsWith("/api/")) {
      const id = pathname.split("/")[2];
      const deleted = await env.TODOS_NEW.delete(id);

      if (deleted !== undefined) {
        return new Response(null, { status: 204, headers: corsHeaders });
      } else {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
      }
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}