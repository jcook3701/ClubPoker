import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "../light-dark-mode-switch/LightDarkModeSwitch";

const Settings: React.FC = () => {
  return (
    <div className={styles.settings}>
      <ArrowBackIosNewIcon className={styles.icon} />
      <LightDarkModeSwitch />
    </div>
  );
};

export default Settings;
