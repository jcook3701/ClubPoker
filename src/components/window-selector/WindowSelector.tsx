import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter"; // Filters page
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // update Google Calander
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // update time page

import styles from "./WindowSelector.module.scss";

const WindowSelector: React.FC = () => {
  const [value, setValue] = useState("timezone");

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue !== null) setValue(newValue); // prevent deselecting all
  };

  return (
    <ToggleButtonGroup
      className={styles.windowSelector}
      value={value}
      exclusive
      onChange={handleChange}
      fullWidth
    >
      <ToggleButton value="timezone" aria-label="timezone">
        <AccessTimeIcon />
      </ToggleButton>
      <ToggleButton value="filter" aria-label="Filter">
        <FilterIcon />
      </ToggleButton>
      <ToggleButton value="calendar" aria-label="calendar">
        <CalendarMonthIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default WindowSelector;
