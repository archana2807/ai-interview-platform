import {
  StateGraph,
  Annotation,
  START,
  END
} from "@langchain/langgraph";

import {
  generateInterviewQuestions
} from "../services/aiService.js";

const InterviewState = Annotation.Root({
  jobRole: Annotation(),
  experience: Annotation(),
  questions: Annotation()
});

const generateQuestionsNode = async (state) => {
  const questions = await generateInterviewQuestions({
    jobRole: state.jobRole,
    experience: state.experience
  });

  return {
    questions
  };
};

const workflow = new StateGraph(InterviewState)
  .addNode(
    "generateQuestions",
    generateQuestionsNode
  )
  .addEdge(
    START,
    "generateQuestions"
  )
  .addEdge(
    "generateQuestions",
    END
  );

export const interviewGraph = workflow.compile();