import { Box, LinearProgress, Typography } from "@mui/material";

function ScoreDisplay({
    score,
    barWidth = 240,
    showBar = true,
    caption
}) {
    const safe = score != null ? Number(score) : 0;
    const pct = Math.min((safe / 10) * 100, 100);

    return (
        <Box>
            <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                    background: "linear-gradient(135deg, #6D7CFF 0%, #5BE584 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                {Number.isFinite(safe) ? safe.toFixed(1) : safe}/10
            </Typography>
            {caption && (
                <Typography variant="caption" color="text.secondary">
                    {caption}
                </Typography>
            )}
            {showBar && (
                <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                        mt: 1,
                        width: barWidth,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: "rgba(255,255,255,0.08)",
                        "& .MuiLinearProgress-bar": {
                            background: "linear-gradient(90deg, #6D7CFF, #5BE584)"
                        }
                    }}
                />
            )}
        </Box>
    );
}

export default ScoreDisplay;