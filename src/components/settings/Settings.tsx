/*!
 * Settings.tsx for ClubPoker Chrome Extension
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

import React from "react";
import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "@/components/switches/light-dark-mode-switch/LightDarkModeSwitch";
import { sendMessage } from "@/services/messageService";
import { MessageTypes } from "@/constants/messages";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import {
  boolToTheme,
  AppSettings,
  ThemeMode,
  themeToBool,
  ClubTypeValues,
  Club,
} from "@types";
import SaveButton from "../buttons/SaveButton";
import BackArrowIconButton from "../buttons/icon-buttons/BackArrowIconButton";

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
  const handleSettingsThemeUpdate = async (updated: ThemeMode) => {
    setSettings((prev) => {
      const newState = {
        ...prev,
        theme: updated,
      };
      return newState;
    });
  };

  const handleSettingsClubUpdate = async (updated: Club) => {
    setSettings((prev) => {
      const newState = {
        ...prev,
        club: updated,
      };
      return newState;
    });
  };

  const handleBackClick = async () => {
    setSettingsSelected(!settingsSelected);
  };

  const handleLightDarkModeSwitch = async (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    handleSettingsThemeUpdate(boolToTheme(checked));
  };

  const handleSelectChange = (
    _event: React.SyntheticEvent,
    option: Club | null
  ) => {
    if (option) {
      handleSettingsClubUpdate(option);
    }
  };

  const handleSaveClick = async () => {
    if (settings) {
      await sendMessage(MessageTypes.SAVE_SETTINGS, {
        settings: settings,
      });
    }
  };

  return (
    <Box className={styles.settingsHeader}>
      <Toolbar>
        <Typography variant="subtitle1" noWrap>
          {"Settings:"}
        </Typography>
        <BackArrowIconButton onClick={handleBackClick} />
      </Toolbar>

      {settings ? (
        <Box className={styles.settingsBody}>
          <LightDarkModeSwitch
            checked={themeToBool(settings.theme)}
            onChange={(event, checked) => {
              handleLightDarkModeSwitch(event, checked);
            }}
          />
          <Autocomplete
            options={ClubTypeValues}
            value={settings.club}
            onChange={handleSelectChange}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Poker Club"
                variant="outlined"
                margin="dense"
              />
            )}
            fullWidth
          />
          <SaveButton onClick={handleSaveClick} />
        </Box>
      ) : (
        <> </>
      )}
    </Box>
  );
};

export default Settings;
