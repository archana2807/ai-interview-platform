import { Paper } from "@mui/material";

function PanelCard({ children, sx, ...rest }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: { xs: 3, md: 4 },
                bgcolor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                ...sx
            }}
            {...rest}
        >
            {children}
        </Paper>
    );
}

export default PanelCard;