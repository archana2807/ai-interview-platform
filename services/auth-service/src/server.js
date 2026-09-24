import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "Auth Service",
    message: "Auth service is running"
  });
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    service: "Auth Service",
    message: "Request reached Auth Service through Gateway"
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});