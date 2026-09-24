import { Box, Chip, Stack, Typography } from "@mui/material";

import { AutoAwesome } from "@mui/icons-material";

import { brandGradient } from "../theme";

function BrandHeader({ title = "Ambika", badge = "AI Interview" }) {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 4 }}
        >
            <Box
                sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    background: brandGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff"
                }}
            >
                <AutoAwesome sx={{ fontSize: 16 }} />
            </Box>
            <Typography variant="subtitle1" fontWeight={800}>
                {title}
            </Typography>
            {badge && (
                <Chip
                    size="small"
                    label={badge}
                    sx={{
                        ml: 1,
                        color: "primary.main",
                        bgcolor: "rgba(109, 124, 255, 0.12)",
                        border: "1px solid rgba(109, 124, 255, 0.3)",
                        fontWeight: 600
                    }}
                />
            )}
        </Stack>
    );
}

export default BrandHeader;