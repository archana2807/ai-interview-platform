import express from "express";
import {
  createInterview,
  getPublicInterview,
  saveAnswer,
  completeInterview,
  getInterviews,
  getInterviewById
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", createInterview);

router.get("/public/:token", getPublicInterview);
router.post(
  "/:token/answers",
  saveAnswer
);
router.post(
  "/:token/complete",
  completeInterview
);
router.get("/", getInterviews);
router.get("/:id", getInterviewById);

export default router;