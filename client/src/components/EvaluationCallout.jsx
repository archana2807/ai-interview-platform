import { Button, Stack, Typography } from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

import { brandGradient } from "../theme";

function EvaluationCallout({
    evaluation,
    hasNext,
    onNext,
    onFinish,
    finishing
}) {
    return (
        <Stack
            sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(91, 229, 132, 0.06)",
                border: "1px solid rgba(91, 229, 132, 0.25)"
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircle color="success" />
                <Typography variant="h6" fontWeight={700}>
                    AI Evaluation
                </Typography>
            </Stack>

            <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 2 }}>
                <Typography variant="h3" fontWeight={800}>
                    {evaluation.score}
                </Typography>
                <Typography color="text.secondary">/10</Typography>
            </Stack>

            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {evaluation.feedback}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
                {hasNext ? (
                    <Button
                        variant="contained"
                        sx={{
                            background: brandGradient,
                            boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                        }}
                        onClick={onNext}
                    >
                        Next Question
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            background: brandGradient,
                            boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                        }}
                        onClick={onFinish}
                        disabled={finishing}
                    >
                        {finishing
                            ? "Completing Interview..."
                            : "Finish Interview"}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

export default EvaluationCallout;