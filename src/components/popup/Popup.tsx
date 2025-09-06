import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, Button } from "@mui/material";
import TimezoneSelect from "../timezone-select/TimezoneSelect";
import Header from "../header/Header";

import styles from "./Popup.module.scss";
import WindowSelector from "../window-selector/WindowSelector";
import Settings from "../settings/Settings";

const Popup: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [selectedWindow, setSelectedWindow] = useState("timezone");
  const [settingsSelected, setSettingsSelected] = useState(false);

  useEffect(() => {
    // This code will run after the component renders
    console.log("Component mounted");
    console.log("styles: ", styles);

    // Cleanup function (optional)
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array means the effect runs once on mount

  // <ThemeProvider />
  return (
    <div className={styles.popup}>
      <Header
        settingsSelected={settingsSelected}
        setSettingsSelected={setSettingsSelected}
      />
      {settingsSelected ? (
        <Settings />
      ) : (
        <WindowSelector
          selectedWindow={selectedWindow}
          onChange={setSelectedWindow}
        />
      )}
    </div>
  );
};

export default Popup;
