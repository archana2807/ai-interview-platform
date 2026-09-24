import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Link,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";

import { Add, AutoAwesome } from "@mui/icons-material";

import { brandGradient } from "../theme";
import { navItems } from "../constants/nav";

import InterviewFormModal from "./InterviewFormModal";

function Header({ onCreateInterview }) {
    const { pathname } = useLocation();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "rgba(6, 6, 11, 0.8)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ gap: 1.5, minHeight: 64 }}>
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        underline="none"
                        color="inherit"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mr: { xs: 0.5, md: "auto" }
                        }}
                    >
                        <Box
                            sx={{
                                width: 34,
                                height: 34,
                                borderRadius: 2,
                                background: brandGradient,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff"
                            }}
                        >
                            <AutoAwesome fontSize="small" />
                        </Box>
                        <Stack spacing={0} sx={{ display: { xs: "none", sm: "flex" } }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={800}
                                lineHeight={1.1}
                            >
Ambika
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                lineHeight={1.1}
                            >
                                AI Interview Console
                            </Typography>
                        </Stack>
                    </Link>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        {navItems.map((item) => (
                            <NavButton
                                key={item.to}
                                item={item}
                                pathname={pathname}
                            />
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={onCreateInterview}
                            sx={{
                                px: { xs: 1.5, md: 2.5 },
                                background: brandGradient,
                                boxShadow: "0 8px 24px rgba(109, 124, 255, 0.35)"
                            }}
                        >
                            New Interview
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function NavButton({ item, pathname }) {
    const active =
        pathname === item.to ||
        (item.to === "/results" && pathname.startsWith("/results"));

    return (
        <Tooltip title={item.label}>
            <Link
                component={NavLink}
                to={item.to}
                underline="none"
                color="text.primary"
                sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: active ? "primary.main" : "text.secondary",
                    bgcolor: active
                        ? "rgba(109, 124, 255, 0.12)"
                        : "transparent",
                    transition:
                        "background-color 0.2s ease, color 0.2s ease",
                    "&:hover": {
                        color: "text.primary",
                        bgcolor: "rgba(255, 255, 255, 0.06)"
                    }
                }}
            >
                {item.label}
            </Link>
        </Tooltip>
    );
}

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: "auto",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                bgcolor: "rgba(6, 6, 11, 0.6)"
            }}
        >
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1.5}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                            sx={{
                                width: 22,
                                height: 22,
                                borderRadius: 1,
                                background: brandGradient,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff"
                            }}
                        >
                            <AutoAwesome sx={{ fontSize: 14 }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            © {new Date().getFullYear()} Ambika · AI Interview
                            Platform
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        divider={
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ borderColor: "rgba(255,255,255,0.12)" }}
                            />
                        }
                    >
                        {[
                            { label: "Privacy", to: "/dashboard" },
                            { label: "Terms", to: "/dashboard" },
                            { label: "Support", to: "/dashboard" }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                component={NavLink}
                                to={item.to}
                                underline="hover"
                                color="text.secondary"
                                variant="body2"
                                sx={{
                                    transition: "color 0.2s ease",
                                    "&:hover": {
                                        color: "primary.main"
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}

function Layout() {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Header onCreateInterview={() => setCreateOpen(true)} />
            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />

            <InterviewFormModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </Box>
    );
}

export default Layout;