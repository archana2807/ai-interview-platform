
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "API Gateway",
    message: "Gateway is running"
  });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": ""
    }
  })
);

app.use(
  "/api/interviews",
  createProxyMiddleware({
    target: process.env.INTERVIEW_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/interviews": ""
    }
  })
);

app.use(
  "/api/ai",
  createProxyMiddleware({
    target: process.env.AI_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/ai": ""
    }
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

