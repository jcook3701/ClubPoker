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
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "inherit" }}>
          <WptIconButton title="ClubWPT" link={CLUB_WPT_URL} />
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: "inherit" }}>
          <LiveHelpIconButton link={HELP_PAGE_URI} />
          <SettingsIconButton onClick={handleSettingsClick} />
          {moreVisible ? <MoreIconButton onClick={handleMoreClick} /> : <></>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
