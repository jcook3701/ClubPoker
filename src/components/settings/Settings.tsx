import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import styles from "./Settings.module.scss";
import LightDarkModeSwitch from "../light-dark-mode-switch/LightDarkModeSwitch";
import { AllSettingsState, Settings } from "../../types/settings";

const Settings: React.FC = () => {
  const [settingsState, setSettingsState] = useState<AllSettingsState>({});

  return (
    <div className={styles.settings}>
      <ArrowBackIosNewIcon className={styles.icon} />
      <LightDarkModeSwitch />
    </div>
  );
};

export default Settings;
