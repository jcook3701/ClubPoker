/*!
 * Header.tsx for ClubPoker Chrome Extension
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
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LiveHelpIconButton from "../buttons/icon-buttons/LiveHelpIconButton";
import MoreIconButton from "../buttons/icon-buttons/MoreIconButton";
import SettingsIconButton from "../buttons/icon-buttons/SettingsIconButton";
import WptIconButton from "../buttons/icon-buttons/WptIconButton";
import { CLUB_WPT_URL, HELP_PAGE_URI } from "../../config/chrome";

type HeaderProps = {
  settingsSelected: boolean;
  setSettingsSelected: (value: boolean) => void;
  title: string;
};

const Header: React.FC<HeaderProps> = ({
  settingsSelected,
  setSettingsSelected,
  title,
}) => {
  const handleSettingsClick = () => {
    setSettingsSelected(!settingsSelected);
  };

  // TODO: Figure out if I actaully want this.
  const moreVisible = false;
  const handleMoreClick = () => {
    alert("Menu clicked!");
  };

  return (
    <AppBar position="sticky" color="default" elevation={0} enableColorOnDark>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <WptIconButton
            sx={{ display: "flex", alignItems: "center", gap: 1, ml: -1 }}
            title="ClubWPT"
            link={CLUB_WPT_URL}
          />
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: -1,
          }}
        >
          <LiveHelpIconButton link={HELP_PAGE_URI} />
          <SettingsIconButton onClick={handleSettingsClick} />
          {moreVisible ? <MoreIconButton onClick={handleMoreClick} /> : <></>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
