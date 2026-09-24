import { interviewGraph } from "../graph/interviewGraph.js";
import {
  evaluateInterviewAnswer,
  generateFinalEvaluation
} from "../services/aiService.js";

export const generateQuestions = async (req, res) => {
  try {
    const {
      jobRole,
      experience
    } = req.body;

    if (!jobRole || !experience) {
      return res.status(400).json({
        success: false,
        message: "Job role and experience are required"
      });
    }

    const result = await interviewGraph.invoke({
      jobRole,
      experience
    });

    return res.status(200).json({
      success: true,
      questions: result.questions
    });
  } catch (error) {
    console.error(
      "Generate questions error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate questions"
    });
  }
};

export const evaluateAnswer = async (req, res) => {

  try {

    const {
      jobRole,
      question,
      answer
    } = req.body;

    if (!jobRole || !question || !answer) {

      return res.status(400).json({
        success: false,
        message:
          "Job role, question and answer are required"
      });

    }

    const evaluation =
      await evaluateInterviewAnswer({
        jobRole,
        question,
        answer
      });

    return res.status(200).json({
      success: true,
      evaluation
    });

  } catch (error) {

    console.error(
      "Evaluate answer error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to evaluate answer"
    });

  }

};

export const finalEvaluation = async (req, res) => {
  try {
    const {
      jobRole,
      answers
    } = req.body;

    if (
      !jobRole ||
      !answers ||
      !Array.isArray(answers)
    ) {
      return res.status(400).json({
        success: false,
        message: "Job role and answers are required"
      });
    }

    const evaluation =
      await generateFinalEvaluation({
        jobRole,
        answers
      });

    return res.status(200).json({
      success: true,
      evaluation
    });
  } catch (error) {
    console.error(
      "Final evaluation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate final evaluation"
    });
  }
};