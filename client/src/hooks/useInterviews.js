import { useEffect, useState, useCallback } from "react";

import { getInterviews } from "../services/interviewApi";

function useInterviews() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadInterviews = useCallback(async () => {
        try {
            setError("");
            const data = await getInterviews();
            setInterviews(data.interviews || []);
        } catch (err) {
            setError(err.message || "Failed to load interviews");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await loadInterviews();
        })();
    }, [loadInterviews]);

    useEffect(() => {
        const onCreated = () => loadInterviews();
        window.addEventListener("interview:created", onCreated);
        return () => window.removeEventListener("interview:created", onCreated);
    }, [loadInterviews]);

    return { interviews, loading, error, refresh: loadInterviews };
}

export default useInterviews;