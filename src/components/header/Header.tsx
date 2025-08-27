import React, { useState } from "react";
import Icon from "../icon/Icon";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const handleHelpClick = () => {
    alert("Help clicked!");
  };

  const handleSettingsClick = () => {
    alert("Settings clicked!");
  };

  const handleMenuClick = () => {
    alert("Menu clicked!");
  };

  return (
    <div className={styles.header}>
      <a
        href="https://lobby.clubwpt.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon src="icon48.png" alt="ClubWPT" className={styles.headerIcon} />
      </a>
      <h3 className={styles.headerTitle}>ClubWPT</h3>
      <LiveHelpIcon
        className={styles.icon}
        titleAccess="help"
        onClick={handleHelpClick}
      />
      <SettingsIcon
        className={styles.icon}
        titleAccess="options"
        onClick={handleSettingsClick}
      />
      <MoreVertIcon
        className={styles.icon}
        titleAccess="more"
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default Header;
