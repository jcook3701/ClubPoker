import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "../light-dark-mode-switch/LightDarkModeSwitch";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import { DEFAULT_SETTINGS } from "../../constants/settings";
import { Button } from "@mui/material";
import { Settings } from "../../types/settings";

type SettingsProps = {
  settingsSelected: boolean;
  setSettingsSelected: (value: boolean) => void;
};

const Settings: React.FC<SettingsProps> = ({
  settingsSelected,
  setSettingsSelected,
}) => {
  const [settingsState, setSettingsState] = useState<Settings>();

  useEffect(() => {
    const loadSavedSettings = async () => {
      const saved = await sendMessage(MessageTypes.GET_SETTINGS, undefined);
      if (saved) {
        setSettingsState(saved.settings);
      } else {
        setSettingsState(DEFAULT_SETTINGS);
      }
    };

    loadSavedSettings();
  }, []);

  const handleBackClick = async () => {
    setSettingsSelected(!settingsSelected);
  };

  const handleSaveClick = async () => {
    sendMessage(MessageTypes.SAVE_SETTINGS, {
      settings: settingsState,
    });
    /*.then(() => {
      sendMessage(MessageTypes.CHANGE_THEME);
    });*/
  };

  return (
    <div className={styles.settings}>
      <ArrowBackIosNewIcon className={styles.icon} onClick={handleBackClick} />
      <LightDarkModeSwitch />
      <Button
        variant="contained"
        color="primary"
        endIcon={<SaveIcon />}
        onClick={handleSaveClick}
      >
        Save
      </Button>
    </div>
  );
};

export default Settings;
