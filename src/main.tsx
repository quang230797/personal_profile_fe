import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ReactDOM from "react-dom/client";
import { ErrorProvider } from "./contexts/ErrorContext";
import { AxiosClientProvider } from "./libs/AxiosClientProvider";
import ErrorModalProvider from "./libs/ErrorModalProvider";
import AppRouter from "./router/AppRouter";
import "./index.css";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
      light: "#424242",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#757575",
      light: "#9E9E9E",
      dark: "#616161",
      contrastText: "#ffffff",
    },
    background: {
      default: "#FAFAFA",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#212121",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#424242",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AxiosClientProvider>
        <AppRouter />
      </AxiosClientProvider>
      <ErrorModalProvider />
    </ThemeProvider>
  </ErrorProvider>,
);
