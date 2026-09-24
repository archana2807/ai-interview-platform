import { createTheme } from "@mui/material/styles";

export const brandGradient =
    "linear-gradient(135deg, #3444DA 0%, #6D7CFF 100%)";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#6D7CFF",
            light: "#8E9AFF",
            dark: "#3444DA",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#3444DA",
            contrastText: "#FFFFFF"
        },
        background: {
            default: "#06060B",
            paper: "#0C0D14"
        },
        text: {
            primary: "#F2F4FA",
            secondary: "#9AA1B8"
        },
        divider: "rgba(255, 255, 255, 0.08)",
        success: { main: "#5BE584" },
        warning: { main: "#FFC94D" },
        info: { main: "#6D7CFF" },
        error: { main: "#FF5C7A" }
    },
    shape: {
        borderRadius: 10
    },
    typography: {
        fontFamily: [
            "Inter",
            "SF Pro Display",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "sans-serif"
        ].join(","),
        h1: { fontWeight: 800, letterSpacing: "-0.02em" },
        h2: { fontWeight: 800, letterSpacing: "-0.02em" },
        h3: { fontWeight: 700, letterSpacing: "-0.02em" },
        h4: { fontWeight: 700, letterSpacing: "-0.01em" },
        h5: { fontWeight: 600 },
        body1: { lineHeight: 1.6 },
        body2: { lineHeight: 1.6 }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background:
                        "radial-gradient(1200px 600px at 70% -10%, rgba(109,124,255,0.08), transparent 60%), radial-gradient(900px 500px at 10% -5%, rgba(52,68,218,0.12), transparent 55%), #06060B",
                    backgroundAttachment: "fixed"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)"
                }
            }
        }
    }
});

export default theme;