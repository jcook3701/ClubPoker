import React, { useEffect, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../header/Header";

import WindowSelector from "../window-selector/WindowSelector";
import Settings from "../settings/Settings";
import type { AppSettings } from "../../types/settings";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import { DARK_THEME, LIGHT_THEME } from "../../constants/theme";

const Popup: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>();
  const [selectedWindow, setSelectedWindow] = useState("timezone");
  const [settingsWindowSelected, setSettingsWindowSelected] = useState(false);

  useEffect(() => {
    const loadSavedSettings = async () => {
      try {
        const saved = await sendMessage(MessageTypes.GET_SETTINGS);
        if (saved) {
          setSettings(saved.settings);
        }
      } catch (err) {
        console.error("Error loading Settings State:", err);
      }
    };

    loadSavedSettings();
  }, []);

  return (
    <ThemeProvider theme={settings?.theme ? DARK_THEME : LIGHT_THEME}>
      {/* CssBaseline sets the <body> background and text color */}
      <CssBaseline />
      <Box
        sx={(theme) => ({
          width: 320,
          height: 435,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2, // theme-based spacing (8px * 2 = 16px)
          p: 2, // padding: theme.spacing(2) = 16px
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          border: "2px solid",
          borderColor: theme.palette.secondary.main,
        })}
      >
        <Header
          settingsSelected={settingsWindowSelected}
          setSettingsSelected={setSettingsWindowSelected}
          title="ClubPoker"
        />
        {settingsWindowSelected ? (
          <Settings
            settings={settings}
            setSettings={setSettings}
            settingsSelected={settingsWindowSelected}
            setSettingsSelected={setSettingsWindowSelected}
          />
        ) : (
          <WindowSelector
            selectedWindow={selectedWindow}
            onChange={setSelectedWindow}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Popup;
