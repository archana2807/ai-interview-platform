import { Divider, Stack, Typography } from "@mui/material";

import { Person, Work, WorkspacePremium } from "@mui/icons-material";

import DetailRow from "./DetailRow";
import PanelCard from "./PanelCard";
import StatusChip from "./StatusChip";

function InterviewInfoCard({
    title = "Interview Details",
    status,
    candidateName,
    candidateEmail,
    jobRole,
    experience
}) {
    return (
        <PanelCard>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                spacing={1}
            >
                <Typography variant="h4" fontWeight={800}>
                    {title}
                </Typography>
                <StatusChip status={status} />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                flexWrap="wrap"
                useFlexGap
            >
                <DetailRow
                    icon={<Person />}
                    label="Candidate"
                    value={candidateName}
                />
                <DetailRow icon={<Work />} label="Role" value={jobRole} />
                <DetailRow
                    icon={<WorkspacePremium />}
                    label="Experience"
                    value={experience}
                />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5 }}>
                {candidateEmail}
            </Typography>
        </PanelCard>
    );
}

export default InterviewInfoCard;