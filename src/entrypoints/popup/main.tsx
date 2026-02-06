/*!
 * popup/index.tsx for ClubPoker Chrome Extension
 *
 * SPDX-FileCopyrightText: Copyright (c) 2025-2026, Jared Cook
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <www.gnu.org>.
 */

import "./index.scss";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { CalendarProvider } from "@/context/GoogleCalendarContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { sendMessage } from "@/services/messageService";
import { MessageTypes } from "@/constants/messages";
import { AppSettings } from "@types";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";

const rootElement = document.getElementById("root");

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
        <App settings={settings} setSettings={setSettings} />
      </CalendarProvider>
    </ThemeProvider>
  );
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeWrapper />
    </React.StrictMode>
  );
}
