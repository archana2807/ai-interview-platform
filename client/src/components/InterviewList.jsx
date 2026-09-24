import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

import { Schedule } from "@mui/icons-material";

import { formatDate } from "../utils/formatDate";

import StatusChip from "./StatusChip";

export function ScoreCell({ score }) {
    if (score == null) {
        return <Typography color="text.secondary">-</Typography>;
    }

    const pct = Math.min((score / 10) * 100, 100);

    return (
        <Box sx={{ minWidth: 110 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="body2" fontWeight={600}>
                    {Number(score).toFixed(1)}/10
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {Math.round(pct)}%
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                    mt: 0.5,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "action.selected"
                }}
            />
        </Box>
    );
}

function InterviewList({
    interviews,
    title = "Recent Interviews",
    viewAllLabel = "View all",
    limit,
    size = "small",
    onSelectInterview,
    onViewAll
}) {
    const navigate = useNavigate();

    const visible = limit ? interviews.slice(0, limit) : interviews;

    const handleSelect = (id) => {
        if (onSelectInterview) {
            onSelectInterview(id);
            return;
        }
        navigate(`/results/${id}`);
    };

    const handleViewAll = () => {
        if (onViewAll) {
            onViewAll();
            return;
        }
        navigate("/results");
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                height: "100%",
                bgcolor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: 3, py: 2 }}
            >
                <Typography variant="h6" fontWeight={700}>
                    {title}
                </Typography>
                {viewAllLabel && interviews.length > 0 && (
                    <Button size="small" onClick={handleViewAll}>
                        {viewAllLabel}
                    </Button>
                )}
            </Stack>
            <Divider />

            {interviews.length === 0 ? (
                <Box sx={{ py: 8, textAlign: "center" }}>
                    <Schedule
                        sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                        No interviews yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create your first interview to get started.
                    </Typography>
                </Box>
            ) : (
                <TableContainer>
                    <Table size={size}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Candidate</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Avg Score</TableCell>
                                <TableCell align="right">Created</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visible.map((interview) => (
                                <TableRow
                                    key={interview._id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() =>
                                        handleSelect(interview._id)
                                    }
                                >
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {interview.candidateName}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {interview.candidateEmail}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {interview.jobRole}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {interview.experience}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <StatusChip status={interview.status} />
                                    </TableCell>
                                    <TableCell>
                                        <ScoreCell
                                            score={
                                                interview.evaluation
                                                    ?.averageScore
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {formatDate(interview.createdAt)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
}

export default InterviewList;