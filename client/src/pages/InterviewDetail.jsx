import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import AnswerCard from "../components/AnswerCard";
import EvaluationCard from "../components/EvaluationCard";
import InterviewInfoCard from "../components/InterviewInfoCard";
import PanelCard from "../components/PanelCard";
import { getInterviewById } from "../services/interviewApi";

function InterviewDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInterview = async () => {
            try {
                const data = await getInterviewById(id);
                setInterview(data.interview);
            } catch (err) {
                setError(err.message || "Failed to load interview");
            } finally {
                setLoading(false);
            }
        };

        loadInterview();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ py: { xs: 5, md: 7 } }}>
            <Container maxWidth="md">
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/results")}
                    sx={{ mb: 3, color: "text.secondary" }}
                >
                    Back to results
                </Button>

                <InterviewInfoCard
                    status={interview.status}
                    candidateName={interview.candidateName}
                    candidateEmail={interview.candidateEmail}
                    jobRole={interview.jobRole}
                    experience={interview.experience}
                />

                {interview.evaluation && (
                    <EvaluationCard evaluation={interview.evaluation} />
                )}

                {/* Answers */}
                <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ mt: 5, mb: 2 }}
                >
                    Candidate Answers
                </Typography>

                {interview.answers.map((item, index) => (
                    <AnswerCard key={index} index={index} answer={item} />
                ))}

                {interview.answers.length === 0 && (
                    <PanelCard sx={{ p: 6, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No answers submitted yet.
                        </Typography>
                    </PanelCard>
                )}
            </Container>
        </Box>
    );
}

export default InterviewDetail;