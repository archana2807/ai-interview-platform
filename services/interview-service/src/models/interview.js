import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    feedback: {
      type: String,
      required: true
    }
  },
  {
    _id: false
  }
);

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    candidateName: {
      type: String,
      required: true
    },

    candidateEmail: {
      type: String,
      required: true
    },

    jobRole: {
      type: String,
      required: true
    },

    experience: {
      type: String,
      required: true
    },

    token: {
      type: String,
      required: true,
      unique: true
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETED"
      ],
      default: "PENDING"
    },

    questions: {
      type: Array,
      default: []
    },

    answers: {
      type: [answerSchema],
      default: []
    },

    evaluation: {
      type: Object,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;