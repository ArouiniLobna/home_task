import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { accounts, categories, transactions } from "./mockData";

const app = new Hono();

// Use CORS middleware
app.use("*", cors());
app
  .get("/accounts", (c) => {
    return c.json(accounts);
  })
  .get("/categories", (c) => {
    return c.json(categories);
  })
  .get("/transactions", (c) => {
    return c.json(transactions);
  });

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
