import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    Container
} from "@mui/material";

import { AutoGraph, ListAlt } from "@mui/icons-material";

import InterviewList from "../components/InterviewList";
import PageHero from "../components/PageHero";
import useInterviews from "../hooks/useInterviews";

function InterviewResults() {
    const { interviews, loading, error } = useInterviews();

    const completed = interviews.filter(
        (i) => i.status === "COMPLETED"
    ).length;

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth="xl">
                <PageHero
                    badge="Results & Evaluations"
                    badgeIcon={<ListAlt sx={{ fontSize: 14 }} />}
                    title="Interview Results"
                    subtitle="View candidate interview status and AI evaluation results."
                >
                    <Chip
                        icon={<AutoGraph />}
                        label={`${completed} completed`}
                        variant="outlined"
                        size="small"
                        sx={{
                            color: "success.main",
                            borderColor: "rgba(91,229,132,0.4)"
                        }}
                    />
                    <Chip
                        label={`${interviews.length} total`}
                        variant="outlined"
                        size="small"
                        color="primary"
                    />
                </PageHero>

                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 6
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <InterviewList
                        interviews={interviews}
                        title="All Interviews"
                        viewAllLabel=""
                    />
                )}
            </Container>
        </Box>
    );
}

export default InterviewResults;