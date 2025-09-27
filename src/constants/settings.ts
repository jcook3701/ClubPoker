import { createTheme } from "@mui/material";
import { AppSettings, Theme } from "../types/settings";

/*
 * Default Settings object
 */
export const DEFAULT_SETTINGS: AppSettings = {
  theme: Theme.lightMode,
};

/*
 * Mui Light Theme
 */
export const LIGHT_THEME = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // rich blue
    },
    secondary: {
      main: "#d32f2f", // red accent
    },
    background: {
      default: "#f5f7fa", // soft grey background
      paper: "#ffffff", // card/popup background
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
});

/*
 * Mui Dark Theme
 */
export const DARK_THEME = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // lighter blue for contrast
    },
    secondary: {
      main: "#ef5350", // red accent
    },
    background: {
      default: "#121212", // true dark background
      paper: "#1e1e1e", // card/popup background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#ff7961", // light red for dark mode
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#ff5252",
          },
        },
      },
    },
  },
});
