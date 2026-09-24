import { Button, Chip, LinearProgress, Stack, TextField, Typography } from "@mui/material";

import { brandGradient } from "../theme";

import CompletionCard from "./CompletionCard";
import EvaluationCallout from "./EvaluationCallout";
import PanelCard from "./PanelCard";

function InterviewQuestionCard({
    question,
    index,
    total,
    progress,
    answer,
    onAnswerChange,
    onSubmit,
    submitting,
    evaluation,
    hasNext,
    onNext,
    onFinish,
    finishing,
    finalEvaluation
}) {
    if (finalEvaluation) {
        return <CompletionCard finalEvaluation={finalEvaluation} />;
    }

    return (
        <PanelCard>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
            >
                <Typography variant="body2" color="text.secondary">
                    Question {index + 1} of {total}
                </Typography>
                <Chip
                    size="small"
                    label={question.category || "General"}
                    variant="outlined"
                    sx={{
                        color: "primary.main",
                        borderColor: "rgba(109,124,255,0.4)"
                    }}
                />
            </Stack>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    mb: 3,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.08)",
                    "& .MuiLinearProgress-bar": {
                        background: brandGradient
                    }
                }}
            />

            <Typography variant="h5" fontWeight={700}>
                {question.question}
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                sx={{ mt: 3 }}
            />

            {!evaluation && (
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        mt: 2.5,
                        px: 4,
                        background: brandGradient,
                        boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                    }}
                    onClick={onSubmit}
                    disabled={submitting}
                >
                    {submitting ? "Evaluating..." : "Submit Answer"}
                </Button>
            )}

            {evaluation && (
                <EvaluationCallout
                    evaluation={evaluation}
                    hasNext={hasNext}
                    onNext={onNext}
                    onFinish={onFinish}
                    finishing={finishing}
                />
            )}
        </PanelCard>
    );
}

export default InterviewQuestionCard;