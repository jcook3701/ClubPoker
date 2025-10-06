import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../header/Header";

import WindowSelector from "../window-selector/WindowSelector";
import Settings from "../settings/Settings";
import type { AppSettings } from "../../types/settings";

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
