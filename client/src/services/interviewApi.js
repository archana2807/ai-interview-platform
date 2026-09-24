const API_URL = import.meta.env.VITE_API_URL;

export const createInterview = async (interviewData) => {
  const response = await fetch(`${API_URL}/interviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(interviewData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create interview");
  }

  return data;
};

export const getPublicInterview = async (token) => {
  const response = await fetch(
    `${API_URL}/interviews/public/${token}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Interview not found");
  }

  return data;
};

export const generateQuestions = async ({
  jobRole,
  experience
}) => {
  const response = await fetch(
    `${API_URL}/ai/generate-questions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobRole,
        experience
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to generate questions"
    );
  }

  return data;
};

export const evaluateAnswer = async ({
  jobRole,
  question,
  answer
}) => {
  const response = await fetch(
    `${API_URL}/ai/evaluate-answer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobRole,
        question,
        answer
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to evaluate answer"
    );
  }

  return data;
};


export const saveInterviewAnswer = async ({
  token,
  question,
  answer,
  score,
  feedback
}) => {
  const response = await fetch(
    `${API_URL}/interviews/${token}/answers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        answer,
        score,
        feedback
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to save answer"
    );
  }

  return data;
};

export const generateFinalEvaluation = async ({
  jobRole,
  answers
}) => {
  const response = await fetch(
    `${API_URL}/ai/final-evaluation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobRole,
        answers
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to generate final evaluation"
    );
  }

  return data;
};

export const completeInterview = async (
  token
) => {
  const response = await fetch(
    `${API_URL}/interviews/${token}/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to complete interview"
    );
  }

  return data;
};

export const getInterviews = async () => {
  const response = await fetch(
    `${API_URL}/interviews`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch interviews"
    );
  }

  return data;
};

export const getInterviewById = async (id) => {
  const response = await fetch(
    `${API_URL}/interviews/${id}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to fetch interview"
    );
  }

  return data;
};