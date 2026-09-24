import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import {
    KeyboardArrowRight,
    RocketLaunch,
    Work,
    WorkspacePremium
} from "@mui/icons-material";

import { brandGradient } from "../theme";

import PanelCard from "./PanelCard";

function InterviewIntroCard({ interview, starting, onStart }) {
    return (
        <PanelCard sx={{ textAlign: "center" }}>
            <Box
                sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    borderRadius: 2.5,
                    background: brandGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 12px 32px rgba(109, 124, 255, 0.35)"
                }}
            >
                <RocketLaunch />
            </Box>

            <Typography variant="h4" fontWeight={800}>
                {interview.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                You've been invited for an AI-powered interview.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                useFlexGap
                flexWrap="wrap"
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Work color="primary" fontSize="small" />
                    <Typography variant="body2">
                        Role: <strong>{interview.jobRole}</strong>
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <WorkspacePremium color="primary" fontSize="small" />
                    <Typography variant="body2">
                        Experience: <strong>{interview.experience}</strong>
                    </Typography>
                </Stack>
            </Stack>

            <Button
                variant="contained"
                size="large"
                endIcon={<KeyboardArrowRight />}
                sx={{
                    mt: 4,
                    px: 4,
                    background: brandGradient,
                    boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                }}
                onClick={onStart}
                disabled={starting}
            >
                {starting ? "Preparing Interview..." : "Start Interview"}
            </Button>
        </PanelCard>
    );
}

export default InterviewIntroCard;