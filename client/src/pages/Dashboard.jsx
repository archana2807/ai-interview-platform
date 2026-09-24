import { useMemo } from "react";

import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    CheckCircle,
    Groups,
    HourglassEmpty,
    Quiz,
    Refresh,
    Schedule
} from "@mui/icons-material";

import InterviewList from "../components/InterviewList";
import StatCard from "../components/StatCard";
import useInterviews from "../hooks/useInterviews";

function Dashboard() {
    const { interviews, loading, error, refresh } = useInterviews();

    const stats = useMemo(() => {
        const completed = interviews.filter(
            (i) => i.status === "COMPLETED"
        ).length;
        const inProgress = interviews.filter(
            (i) => i.status === "IN_PROGRESS"
        ).length;
        const pending = interviews.length - completed - inProgress;

        return {
            total: interviews.length,
            completed,
            inProgress,
            pending
        };
    }, [interviews]);

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth="xl">
                {/* Hero */}
                <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
                    <Chip
                        icon={<Quiz sx={{ fontSize: 14 }} />}
                        label="AI-Powered Hiring"
                        size="small"
                        sx={{
                            mb: 2.5,
                            px: 1,
                            color: "primary.main",
                            bgcolor: "rgba(109, 124, 255, 0.12)",
                            border: "1px solid rgba(109, 124, 255, 0.3)",
                            fontWeight: 600
                        }}
                    />
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            fontSize: { xs: "1.9rem", md: "2.75rem" },
                            mb: 1.5
                        }}
                    >
                        Recruiter Dashboard
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 560, mx: "auto" }}
                    >
                        Create, manage, and track AI-powered candidate
                        interviews — all in one place.
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={1.5}
                        justifyContent="center"
                        sx={{ mt: 3 }}
                    >
                        <Tooltip title="Refresh data">
                            <IconButton
                                color="primary"
                                onClick={refresh}
                                disabled={loading}
                                sx={{
                                    border: "1px solid rgba(109,124,255,0.3)"
                                }}
                            >
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                onClick={refresh}
                            >
                                Retry
                            </Button>
                        }
                    >
                        {error}
                    </Alert>
                )}

                {/* Loading Skeleton */}
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 6
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {!loading && (
                    <>
                        {/* Overview Cards */}
                        <Grid container spacing={3} sx={{ mb: 5 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <StatCard
                                    icon={<Groups />}
                                    label="Total Interviews"
                                    value={stats.total}
                                    caption="All interviews created"
                                    accent="primary"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <StatCard
                                    icon={<CheckCircle />}
                                    label="Completed"
                                    value={stats.completed}
                                    caption="Candidates finished"
                                    accent="success"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <StatCard
                                    icon={<HourglassEmpty />}
                                    label="In Progress"
                                    value={stats.inProgress}
                                    caption="Awaiting completion"
                                    accent="info"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <StatCard
                                    icon={<Schedule />}
                                    label="Pending"
                                    value={stats.pending}
                                    caption="Yet to start"
                                    accent="warning"
                                />
                            </Grid>
                        </Grid>

                        {/* Recent Interviews */}
                        <InterviewList interviews={interviews} limit={8} />
                    </>
                )}
            </Container>
        </Box>
    );
}

export default Dashboard;