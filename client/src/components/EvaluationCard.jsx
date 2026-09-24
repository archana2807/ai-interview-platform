import { Stack, Typography } from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

import PanelCard from "./PanelCard";
import ScoreDisplay from "./ScoreDisplay";

function EvaluationCard({ evaluation }) {
    return (
        <PanelCard sx={{ mt: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
                <CheckCircle color="success" />
                <Typography variant="h6" fontWeight={700}>
                    Final Evaluation
                </Typography>
            </Stack>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 6 }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mt: 3 }}
            >
                <ScoreDisplay score={evaluation.averageScore} />
                <Stack spacing={0.5}>
                    <Typography variant="body1">
                        Questions:{" "}
                        <strong>{evaluation.totalQuestions}</strong>
                    </Typography>
                    <Typography variant="body1">
                        Total Score: <strong>{evaluation.totalScore}</strong>
                    </Typography>
                </Stack>
            </Stack>
        </PanelCard>
    );
}

export default EvaluationCard;