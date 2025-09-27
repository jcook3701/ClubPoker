import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "../switches/light-dark-mode-switch/LightDarkModeSwitch";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import { Button } from "@mui/material";
import {
  boolToTheme,
  AppSettings,
  Theme,
  themeToBool,
} from "../../types/settings";

type SettingsProps = {
  settings?: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings | undefined>>;
  settingsSelected: boolean;
  setSettingsSelected: (value: boolean) => void;
};

const Settings: React.FC<SettingsProps> = ({
  settings,
  setSettings,
  settingsSelected,
  setSettingsSelected,
}) => {
  const handleSettingsThemeUpdate = async (updated: Theme) => {
    setSettings((prev) => {
      const newState = {
        ...(prev ?? {}),
        theme: updated,
      };
      return newState;
    });
  };

  const handleBackClick = async () => {
    setSettingsSelected(!settingsSelected);
  };

  const handleSaveClick = async () => {
    if (settings) {
      await sendMessage(MessageTypes.SAVE_SETTINGS, {
        settings: settings,
      });
    }
  };

  const handleLightDarkModeSwitch = async (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    handleSettingsThemeUpdate(boolToTheme(checked));
  };

  return (
    <div className={styles.settingsHeader}>
      <ArrowBackIosNewIcon className={styles.icon} onClick={handleBackClick} />
      {settings ? (
        <div className={styles.settingsBody}>
          <h3>Settings:</h3>
          <LightDarkModeSwitch
            checked={themeToBool(settings.theme)}
            onChange={(event, checked) => {
              handleLightDarkModeSwitch(event, checked);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SaveIcon />}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Settings;
