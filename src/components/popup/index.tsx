import "./index.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";
import { CalendarProvider } from "../../context/GoogleCalendarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import { AppSettings } from "@types";
import { DARK_THEME, LIGHT_THEME } from "../../constants/theme";

// Create a new div for mounting React
const rootElement = document.createElement("div");
rootElement.className = "container";
rootElement.style.width = "100%";
rootElement.style.height = "100%";
document.body.appendChild(rootElement);

document.body.style.margin = "0";
document.body.style.padding = "0";
rootElement.style.background = "transparent";

const root = ReactDOM.createRoot(rootElement);

const ThemeWrapper: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>();

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
      <CssBaseline />
      <CalendarProvider>
        <Popup settings={settings} setSettings={setSettings} />
      </CalendarProvider>
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <ThemeWrapper />
  </React.StrictMode>
);
