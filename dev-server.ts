import express from "express";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import worker from "./server";

dotenv.config();

async function startDevServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON body parser to match dev expectations
  app.use(express.json());

  // API Bridge: Forward all API calls directly to the Cloudflare Worker fetch handler
  app.all("/api/*", async (req, res) => {
    try {
      const fullUrl = `http://${req.headers.host || "localhost"}${req.originalUrl}`;
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => headers.append(key, v));
          } else {
            headers.set(key, value);
          }
        }
      }

      let body: string | undefined = undefined;
      if (req.method !== "GET" && req.method !== "HEAD") {
        body = JSON.stringify(req.body);
      }

      const webRequest = new Request(fullUrl, {
        method: req.method,
        headers,
        body,
      });

      const env = {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
      };

      const webResponse = await worker.fetch(webRequest, env);

      webResponse.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      res.status(webResponse.status);
      res.send(await webResponse.text());
    } catch (err: any) {
      console.error("Dev API Bridge Error:", err);
      res.status(500).json({ error: err.message || "Local dev API bridge failure" });
    }
  });

  // Mount Vite development middleware for hot-reloading & asset serving
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Local development environment active on http://localhost:${PORT}`);
  });
}

startDevServer().catch((err) => {
  console.error("Failed to start development server:", err);
});
