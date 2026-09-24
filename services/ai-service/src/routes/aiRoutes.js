import express from "express";
import {
  generateQuestions,
  evaluateAnswer,
  finalEvaluation
} from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/generate-questions",
  generateQuestions
);
router.post(
  "/evaluate-answer",
  evaluateAnswer
);

router.post(
  "/final-evaluation",
  finalEvaluation
);

export default router;