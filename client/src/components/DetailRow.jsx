import { Box, Stack, Typography } from "@mui/material";

function DetailRow({ icon, label, value }) {
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(109, 124, 255, 0.12)",
                    color: "primary.main"
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}

export default DetailRow;