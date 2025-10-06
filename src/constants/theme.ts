import { createTheme } from "@mui/material";

const MUI_AUTOCOMPLETE_STYLE = {
  MuiAutocomplete: {
    defaultProps: {
      size: "small" as const,
    },
  },
};

const MIU_APPBAR_STYLE = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        borderBottom: "1px solid #ff7961", // custom border
      },
    },
  },
};

const MIU_TOOLBAR_STYLE = {
  MuiToolbar: {
    styleOverrides: {
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: 0,
      },
    },
  },
};

const MUI_BUTTON_STYLE = {
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
};

const MUI_TYPOGRAPHY_STYLE = {
  MuiTypography: {
    styleOverrides: {
      h6: {
        marginLeft: 2,
        fontWeight: "bold",
      },
      subtitle1: {
        marginLeft: 2,
        fontWeight: "bold",
      },
      subtitle2: {
        marginLeft: 2,
        fontWeight: "bold",
      },
    },
  },
};

const MUI_COMPONENTS_STYLES = {
  components: {
    ...MIU_APPBAR_STYLE,
    ...MIU_TOOLBAR_STYLE,
    ...MUI_TYPOGRAPHY_STYLE,
    ...MUI_BUTTON_STYLE,
    ...MUI_AUTOCOMPLETE_STYLE,
  },
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
  ...MUI_COMPONENTS_STYLES,
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
  ...MUI_COMPONENTS_STYLES,
});
