export function formatDate(value) {
    if (!value) return "-";
    try {
        return new Date(value).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    } catch {
        return "-";
    }
}

export default formatDate;