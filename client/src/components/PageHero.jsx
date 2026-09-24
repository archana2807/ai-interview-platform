import { Box, Chip, Stack, Typography } from "@mui/material";

function PageHero({ badge, badgeIcon, title, subtitle, children }) {
    return (
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            {badge && (
                <Chip
                    icon={badgeIcon}
                    label={badge}
                    size="small"
                    sx={{
                        mb: 2,
                        px: 1,
                        color: "primary.main",
                        bgcolor: "rgba(109, 124, 255, 0.12)",
                        border: "1px solid rgba(109, 124, 255, 0.3)",
                        fontWeight: 600
                    }}
                />
            )}
            <Typography variant="h4" fontWeight={800}>
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 520, mx: "auto", mt: 1 }}
                >
                    {subtitle}
                </Typography>
            )}
            {children && (
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ mt: 2.5 }}
                >
                    {children}
                </Stack>
            )}
        </Box>
    );
}

export default PageHero;