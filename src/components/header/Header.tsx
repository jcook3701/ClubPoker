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

  const handleMenuClick = () => {
    alert("Menu clicked!");
  };

  return (
    <AppBar position="static" color="default" elevation={0} enableColorOnDark>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <WptIconButton title="ClubWPT" link={CLUB_WPT_URL} />
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LiveHelpIconButton link={HELP_PAGE_URI} />
          <SettingsIconButton onClick={handleSettingsClick} />
          <MoreIconButton onClick={handleMenuClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
