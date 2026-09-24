import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import PanelCard from "./PanelCard";

function AnswerCard({ index, answer }) {
    return (
        <PanelCard sx={{ mb: 3, p: { xs: 2.5, md: 3 } }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Chip
                    size="small"
                    label={`Question ${index + 1}`}
                    color="primary"
                    variant="outlined"
                />
                <Typography variant="body2" fontWeight={700}>
                    Score: {answer.score}/10
                </Typography>
            </Stack>

            <Typography sx={{ mt: 2 }} fontWeight={500}>
                {answer.question}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" color="text.secondary">
                {answer.answer}
            </Typography>

            <Box
                sx={{
                    mt: 2.5,
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: "rgba(109, 124, 255, 0.08)",
                    border: "1px solid rgba(109, 124, 255, 0.2)"
                }}
            >
                <Typography
                    variant="caption"
                    color="primary.main"
                    fontWeight={600}
                >
                    AI FEEDBACK
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {answer.feedback}
                </Typography>
            </Box>
        </PanelCard>
    );
}

export default AnswerCard;