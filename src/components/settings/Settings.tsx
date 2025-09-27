import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "../switches/light-dark-mode-switch/LightDarkModeSwitch";
import { sendMessage } from "../../services/messageService";
import { MessageTypes } from "../../constants/messages";
import { Button } from "@mui/material";
import {
  boolToTheme,
  Settings,
  Theme,
  themeToBool,
} from "../../types/settings";

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
      try {
        const saved = await sendMessage(MessageTypes.GET_SETTINGS);
        if (saved) {
          setSettingsState(saved.settings);
        }
      } catch (err) {
        console.error("Error loading Settings State:", err);
      }
    };

    loadSavedSettings();
  }, []);

  const handleSettingsThemeUpdate = async (updated: Theme) => {
    setSettingsState((prev) => {
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
    if (settingsState) {
      await sendMessage(MessageTypes.SAVE_SETTINGS, {
        settings: settingsState,
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
      {settingsState ? (
        <div className={styles.settingsBody}>
          <h3>Settings:</h3>
          <LightDarkModeSwitch
            checked={themeToBool(settingsState.theme)}
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
