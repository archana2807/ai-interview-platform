import { Box, Container } from "@mui/material";

function InterviewShell({ children, maxWidth = "md" }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 6,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center"
            }}
        >
            <Container maxWidth={maxWidth}>{children}</Container>
        </Box>
    );
}

export default InterviewShell;