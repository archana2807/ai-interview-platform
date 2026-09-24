import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Box, CircularProgress } from "@mui/material";

import {
    getPublicInterview,
    generateQuestions,
    evaluateAnswer,
    saveInterviewAnswer,
    completeInterview
} from "../services/interviewApi";

import BrandHeader from "../components/BrandHeader";
import CompletionCard from "../components/CompletionCard";
import InterviewIntroCard from "../components/InterviewIntroCard";
import InterviewQuestionCard from "../components/InterviewQuestionCard";
import InterviewShell from "../components/InterviewShell";

function PublicInterview() {
    const { token } = useParams();

    const [interview, setInterview] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answer, setAnswer] = useState("");
    const [evaluation, setEvaluation] = useState(null);

    const [finalEvaluation, setFinalEvaluation] = useState(null);

    const [completing, setCompleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);
    const [evaluating, setEvaluating] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        const loadInterview = async () => {
            try {
                const data = await getPublicInterview(token);
                setInterview(data.interview);
            } catch (err) {
                setError(err.message || "Failed to load interview");
            } finally {
                setLoading(false);
            }
        };

        loadInterview();
    }, [token]);

    const handleStartInterview = async () => {
        if (interview.status === "COMPLETED") return;

        try {
            setStarting(true);
            setError("");

            const data = await generateQuestions({
                jobRole: interview.jobRole,
                experience: interview.experience
            });

            setQuestions(data.questions);
            setCurrentQuestion(0);
            setAnswer("");
            setEvaluation(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setStarting(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) {
            setError("Please enter your answer.");
            return;
        }

        try {
            setEvaluating(true);
            setError("");
            setEvaluation(null);

            const question = questions[currentQuestion];

            const data = await evaluateAnswer({
                jobRole: interview.jobRole,
                question: question.question,
                answer
            });

            setEvaluation(data.evaluation);

            await saveInterviewAnswer({
                token,
                question: question.question,
                answer,
                score: data.evaluation.score,
                feedback: data.evaluation.feedback
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setEvaluating(false);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => prev + 1);
        setAnswer("");
        setEvaluation(null);
        setError("");
    };

    const handleCompleteInterview = async () => {
        try {
            setCompleting(true);
            setError("");

            const data = await completeInterview(token);

            setFinalEvaluation(data.evaluation);
        } catch (err) {
            setError(err.message);
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <InterviewShell>
                <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                    <CircularProgress />
                </Box>
            </InterviewShell>
        );
    }

    if (error && !interview) {
        return (
            <InterviewShell>
                <Alert severity="error">{error}</Alert>
            </InterviewShell>
        );
    }

    if (!interview) {
        return null;
    }

    const question = questions[currentQuestion];
    const progress =
        ((currentQuestion + (evaluation ? 1 : 0)) / questions.length) * 100;

    return (
        <InterviewShell>
            <BrandHeader />

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {interview.status === "COMPLETED" ? (
                interview.evaluation ? (
                    <CompletionCard finalEvaluation={interview.evaluation} />
                ) : (
                    <Alert severity="info">
                        This interview has already been completed.
                    </Alert>
                )
            ) : (
                <>
                    {!questions.length && (
                        <InterviewIntroCard
                            interview={interview}
                            starting={starting}
                            onStart={handleStartInterview}
                        />
                    )}

                    {questions.length > 0 && question && (
                        <InterviewQuestionCard
                            question={question}
                            index={currentQuestion}
                            total={questions.length}
                            progress={progress}
                            answer={answer}
                            onAnswerChange={setAnswer}
                            onSubmit={handleSubmitAnswer}
                            submitting={evaluating}
                            evaluation={evaluation}
                            hasNext={currentQuestion < questions.length - 1}
                            onNext={handleNextQuestion}
                            onFinish={handleCompleteInterview}
                            finishing={completing}
                            finalEvaluation={finalEvaluation}
                        />
                    )}
                </>
            )}
        </InterviewShell>
    );
}

export default PublicInterview;