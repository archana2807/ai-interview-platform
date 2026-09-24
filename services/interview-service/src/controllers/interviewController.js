import crypto from "crypto";
import Interview from "../models/interview.js";

// Create interview
export const createInterview = async (req, res) => {
  try {
    const {
      title,
      candidateName,
      candidateEmail,
      jobRole,
      experience
    } = req.body;

    if (
      !title ||
      !candidateName ||
      !candidateEmail ||
      !jobRole ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const token = crypto.randomBytes(16).toString("hex");

    const interview = await Interview.create({
      title,
      candidateName,
      candidateEmail,
      jobRole,
      experience,
      token
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview: {
        id: interview._id,
        title: interview.title,
        candidateName: interview.candidateName,
        candidateEmail: interview.candidateEmail,
        jobRole: interview.jobRole,
        experience: interview.experience,
        token: interview.token,
        status: interview.status,
        interviewLink: `${process.env.CLIENT_URL}/interview/${interview.token}`
      }
    });
  } catch (error) {
    console.error("Create interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create interview"
    });
  }
};


// Get public interview
export const getPublicInterview = async (req, res) => {
  try {
    const { token } = req.params;

    const interview = await Interview.findOne({
      token
    }).select(
      "title candidateName jobRole experience token status evaluation"
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    return res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    console.error("Get public interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview"
    });
  }
};

export const saveAnswer = async (req, res) => {
  try {
    const { token } = req.params;

    const {
      question,
      answer,
      score,
      feedback
    } = req.body;

    if (
      !question ||
      !answer ||
      score === undefined ||
      !feedback
    ) {
      return res.status(400).json({
        success: false,
        message: "Question, answer, score and feedback are required"
      });
    }

    const interview = await Interview.findOne({
      token
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    if (interview.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "This interview has already been completed"
      });
    }

    interview.answers.push({
      question,
      answer,
      score,
      feedback
    });

    interview.status = "IN_PROGRESS";

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Answer saved successfully"
    });
  } catch (error) {
    console.error("Save answer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save answer"
    });
  }
};

export const completeInterview = async (req, res) => {
  try {
    const { token } = req.params;

    const interview = await Interview.findOne({
      token
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    if (interview.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "This interview has already been completed"
      });
    }

    if (interview.answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No answers found"
      });
    }

    const totalScore = interview.answers.reduce(
      (total, item) => total + item.score,
      0
    );

    const averageScore =
      totalScore / interview.answers.length;

    interview.status = "COMPLETED";

    interview.evaluation = {
      totalQuestions: interview.answers.length,
      totalScore,
      averageScore: Number(
        averageScore.toFixed(2)
      )
    };

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed successfully",
      evaluation: interview.evaluation
    });
  } catch (error) {
    console.error(
      "Complete interview error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to complete interview"
    });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .sort({ createdAt: -1 })
      .select(
        "title candidateName candidateEmail jobRole experience status evaluation createdAt"
      );

    return res.status(200).json({
      success: true,
      interviews
    });
  } catch (error) {
    console.error(
      "Get interviews error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interviews"
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found"
      });
    }

    return res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    console.error(
      "Get interview by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview"
    });
  }
};