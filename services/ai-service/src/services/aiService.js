import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0.4
});

// Generate interview questions
export const generateInterviewQuestions = async ({
  jobRole,
  experience
}) => {
  const prompt = `
You are an expert technical interviewer.

Generate exactly 5 interview questions.

Job Role:
${jobRole}

Candidate Experience:
${experience}

Requirements:
- Questions must be relevant to the job role.
- Match the candidate's experience level.
- Include technical questions.
- Include practical questions.
- Include scenario-based questions.
- Do not provide answers.

Return ONLY valid JSON in this format:

{
  "questions": [
    {
      "question": "string",
      "category": "technical"
    }
  ]
}
`;

  const response = await model.invoke(prompt);

  const content = response.content;

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const result = JSON.parse(cleanedContent);

  return result.questions;
};


// Evaluate candidate answer
export const evaluateInterviewAnswer = async ({
  jobRole,
  question,
  answer
}) => {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Job Role:
${jobRole}

Question:
${question}

Candidate Answer:
${answer}

Evaluate based on:

- Technical correctness
- Understanding
- Relevance
- Completeness

Give a score from 0 to 10.

Return ONLY valid JSON:

{
  "score": 0,
  "feedback": "string"
}
`;

  const response = await model.invoke(prompt);

  const content = response.content;

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedContent);
};

export const generateFinalEvaluation = async ({
  jobRole,
  answers
}) => {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's complete interview.

Job Role:
${jobRole}

Candidate Answers:
${JSON.stringify(answers, null, 2)}

Analyze:
- Overall technical knowledge
- Problem-solving ability
- Understanding
- Answer quality
- Areas of strength
- Areas for improvement

Return ONLY valid JSON:

{
  "overallScore": 0,
  "summary": "string",
  "strengths": ["string"],
  "improvements": ["string"]
}
`;

  const response = await model.invoke(prompt);

  const content = response.content;

  const cleanedContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedContent);
};

