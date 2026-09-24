import "dotenv/config";

import express from "express";
import cors from "cors";

import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "AI Service",
    message: "AI service is running"
  });
});

app.use("/", aiRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(
    `AI Service running on port ${PORT}`
  );
});