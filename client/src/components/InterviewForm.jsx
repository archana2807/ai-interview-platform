import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import { useForm } from "react-hook-form";
import { createInterview } from "../services/interviewApi";

function InterviewForm({ onCreated, onSuccess }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: "",
            candidateName: "",
            candidateEmail: "",
            jobRole: "",
            experience: ""
        }
    });

    const [createdInterview, setCreatedInterview] = useState(null);
    const [serverError, setServerError] = useState("");

    const onSubmit = async (formData) => {
        try {
            setServerError("");
            setCreatedInterview(null);

            const data = await createInterview(formData);

            setCreatedInterview(data.interview);

            reset();

            onCreated?.();
            onSuccess?.(data.interview);
            window.dispatchEvent(new Event("interview:created"));
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* Interview Title */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Interview Title"
                            {...register("title", {
                                required: "Interview title is required",
                                minLength: {
                                    value: 3,
                                    message: "Title must be at least 3 characters"
                                }
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Grid>

                    {/* Candidate Name */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Candidate Name"
                            {...register("candidateName", {
                                required: "Candidate name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                            error={!!errors.candidateName}
                            helperText={errors.candidateName?.message}
                        />
                    </Grid>

                    {/* Candidate Email */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Candidate Email"
                            {...register("candidateEmail", {
                                required: "Candidate email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            error={!!errors.candidateEmail}
                            helperText={errors.candidateEmail?.message}
                        />
                    </Grid>

                    {/* Job Role */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Job Role"
                            {...register("jobRole", {
                                required: "Job role is required",
                                minLength: {
                                    value: 2,
                                    message: "Job role must be at least 2 characters"
                                }
                            })}
                            error={!!errors.jobRole}
                            helperText={errors.jobRole?.message}
                        />
                    </Grid>

                    {/* Experience */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Experience"
                            placeholder="e.g. 3+ years"
                            {...register("experience", {
                                required: "Experience is required",
                                minLength: {
                                    value: 2,
                                    message: "Please enter experience"
                                }
                            })}
                            error={!!errors.experience}
                            helperText={errors.experience?.message}
                        />
                    </Grid>

                    {serverError && (
                        <Grid size={{ xs: 12 }}>
                            <Alert severity="error">{serverError}</Alert>
                        </Grid>
                    )}

                    {/* Submit Button */}
                    <Grid size={{ xs: 12 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                py: 1.25,
                                background: "linear-gradient(135deg, #3444DA 0%, #6D7CFF 100%)",
                                boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Creating..."
                                : "Create Interview"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Success Message */}
            {createdInterview && (
                <Alert severity="success" sx={{ mt: 4 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Interview created successfully!
                    </Typography>

                    <Typography variant="body2">
                        Share this link with the candidate:
                    </Typography>

                    <TextField
                        fullWidth
                        value={createdInterview.interviewLink}
                        sx={{ mt: 2 }}
                        slotProps={{
                            input: {
                                readOnly: true
                            }
                        }}
                    />

                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                createdInterview.interviewLink
                            )
                        }
                    >
                        Copy Interview Link
                    </Button>
                </Alert>
            )}
        </>
    );
}

export default InterviewForm;