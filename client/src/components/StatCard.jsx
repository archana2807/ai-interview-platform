import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const accents = {
    primary: "linear-gradient(135deg, #3444DA 0%, #6D7CFF 100%)",
    success: "linear-gradient(135deg, #1E8E5A 0%, #5BE584 100%)",
    info: "linear-gradient(135deg, #3444DA 0%, #6D7CFF 100%)",
    warning: "linear-gradient(135deg, #B27A0E 0%, #FFC94D 100%)"
};

function StatCard({ icon, label, value, caption, accent = "primary" }) {
    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                bgcolor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
        >
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            borderRadius: 2,
                            background: accents[accent],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            boxShadow: "0 8px 24px rgba(109, 124, 255, 0.25)"
                        }}
                    >
                        {icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            lineHeight={1.1}
                        >
                            {value}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                        >
                            {label}
                        </Typography>
                    </Box>
                </Stack>
                {caption && (
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 1.5 }}
                    >
                        {caption}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default StatCard;