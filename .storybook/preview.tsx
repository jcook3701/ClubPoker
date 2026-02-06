/*!
 * .storybook/preview.ts for ClubPoker Chrome Extension
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

import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

// Import your real themes and provider
import { DARK_THEME, LIGHT_THEME } from "../src/constants/theme";
import { CalendarProvider } from "../src/context/GoogleCalendarContext";

const preview: Preview = {
  parameters: {
    // Match your extension's popup dimensions in the preview
    layout: "centered",
    backgrounds: {
      default: "poker-green",
      options: {
        light: { name: "Light", value: "#ffffff" },
        dark: { name: "Dark", value: "#121212" },
        "poker-green": { name: "Poker Green", value: "#0a5c0a" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story, context) => {
      /* 
         1. ThemeProvider: Use DARK_THEME as default since that's your app's vibe.
         2. CalendarProvider: Essential for useGoogleCalendar() to work in stories.
         3. Box: Provides the 320px width so you see exactly how it looks in the popup.
      */
      const bgValue = context.globals.backgrounds?.value;

      // 2. LOGIC: If it's the dark or green background, use DARK_THEME.
      // Otherwise (default/white), use LIGHT_THEME.
      const isDarkBackground = bgValue === "#121212" || bgValue === "#0a5c0a";
      const currentTheme = isDarkBackground ? DARK_THEME : LIGHT_THEME;
      
      // 3. FORCE RE-RENDER when switching to prevent "stuck" UI
      const themeKey = isDarkBackground ? "dark" : "light";
      return (
        <ThemeProvider theme={currentTheme} key={themeKey}>
          <CssBaseline />
          <CalendarProvider>
            <Box
              sx={{
                width: 320,
                minHeight: 435,
                p: 1,
                bgcolor: "background.default",
                color: "text.primary",
                boxSizing: "border-box",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                border:  !isDarkBackground ? "1px solid #e0e0e0" : "none",
              }}
            >
              <Story />
            </Box>
          </CalendarProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
