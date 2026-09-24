import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import interviewRoutes from "./routes/interviewRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "Interview Service",
    message: "Interview service is running"
  });
});

app.use("/", interviewRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Interview Service running on port ${PORT}`);
});