import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography
} from "@mui/material";

import { Close, RocketLaunch } from "@mui/icons-material";

import { brandGradient } from "../theme";

import InterviewForm from "./InterviewForm";

function InterviewFormModal({ open, onClose, onCreated, onSuccess }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        background:
                            "radial-gradient(600px 250px at 80% -10%, rgba(109,124,255,0.12), transparent 60%), #0C0D14",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                    }
                }
            }}
        >
            <DialogTitle>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <BoxGradientMark />
                        <Stack spacing={0}>
                            <Typography variant="h6" fontWeight={800}>
                                Create Interview
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Generate a shareable AI-powered candidate link.
                            </Typography>
                        </Stack>
                    </Stack>
                    <IconButton onClick={onClose} size="small" color="inherit">
                        <Close fontSize="small" />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <InterviewForm onCreated={onCreated} onSuccess={onSuccess} />
            </DialogContent>
        </Dialog>
    );
}

function BoxGradientMark() {
    return (
        <Stack
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: brandGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff"
            }}
        >
            <RocketLaunch fontSize="small" />
        </Stack>
    );
}

export default InterviewFormModal;