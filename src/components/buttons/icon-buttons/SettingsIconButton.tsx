/*!
 * SettingsIconButton.tsx for ClubPoker Chrome Extension
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
import { IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

type SettingsIconButtonProps = {
  onClick: () => void;
};

const SettingsIconButton: React.FC<SettingsIconButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="settings" placement="top-start" arrow>
      <IconButton color="inherit" onClick={onClick}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SettingsIconButton;
