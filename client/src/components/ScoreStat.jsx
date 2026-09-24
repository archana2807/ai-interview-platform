import { Box, Typography } from "@mui/material";

function ScoreStat({ value, label }) {
    return (
        <Box>
            <Typography variant="h2" fontWeight={800}>
                {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {label}
            </Typography>
        </Box>
    );
}

export default ScoreStat;