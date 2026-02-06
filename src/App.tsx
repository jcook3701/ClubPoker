/*!
 * Popup.tsx for ClubPoker Chrome Extension
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

import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/header/Header";

import WindowSelector from "@/components/window-selector/WindowSelector";
import Settings from "@/components/settings/Settings";
import type { AppSettings } from "@types";

type PopupProps = {
  settings?: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings | undefined>>;
};

const Popup: React.FC<PopupProps> = ({ settings, setSettings }) => {
  const [selectedWindow, setSelectedWindow] = useState("timezone");
  const [settingsWindowSelected, setSettingsWindowSelected] = useState(false);

  return (
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
        borderColor: theme.palette.primary.main,
        boxSizing: "border-box", // ensures border is inside the box
        overflow: "hidden", // ensures background fills border-radius
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
  );
};

export default Popup;
