import { Chip } from "@mui/material";

const statusMeta = {
    PENDING: { label: "Pending", color: "warning" },
    IN_PROGRESS: { label: "In Progress", color: "info" },
    COMPLETED: { label: "Completed", color: "success" }
};

function StatusChip({ status, size = "small", variant = "outlined" }) {
    const meta = statusMeta[status] || {
        label: status || "Unknown",
        color: "default"
    };

    return (
        <Chip
            size={size}
            label={meta.label}
            color={meta.color}
            variant={variant}
        />
    );
}

export default StatusChip;