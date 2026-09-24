import { Box, Stack, Typography } from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

import { brandGradient } from "../theme";

import PanelCard from "./PanelCard";
import ScoreStat from "./ScoreStat";

function CompletionCard({ finalEvaluation }) {
    return (
        <PanelCard
            sx={{
                mt: 4,
                textAlign: "center",
                bgcolor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(91, 229, 132, 0.3)"
            }}
        >
            <Box
                sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1.5,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(91, 229, 132, 0.12)",
                    color: "success.main"
                }}
            >
                <CheckCircle />
            </Box>
            <Typography variant="h4" fontWeight={800}>
                Interview Completed
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Thanks for taking the time — here's your summary.
            </Typography>

            <Stack
                direction="row"
                justifyContent="center"
                spacing={4}
                sx={{ mt: 4 }}
            >
                <Box>
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            background: brandGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        {finalEvaluation.averageScore}/10
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Final Score
                    </Typography>
                </Box>
                <ScoreStat
                    value={finalEvaluation.totalQuestions}
                    label="Answered"
                />
                <ScoreStat value={finalEvaluation.totalScore} label="Total Score" />
            </Stack>
        </PanelCard>
    );
}

export default CompletionCard;