import React, { useState } from "react";
import Icon from "../icon/Icon";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import styles from "./Header.module.scss";

type HeaderProps = {
  settingsSelected: boolean;
  setSettingsSelected: (value: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  settingsSelected,
  setSettingsSelected,
}) => {
  const handleHelpClick = () => {
    alert("Help clicked!");
  };

  const handleSettingsClick = () => {
    setSettingsSelected(!settingsSelected);
    console.log(settingsSelected);
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
      <a
        href="https://github.com/jcook3701/club-wpt-chrome-extension"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LiveHelpIcon className={styles.icon} titleAccess="help" />
      </a>

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
