import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter"; // Filters page
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // update Google Calander
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // update time page

import styles from "./WindowSelector.module.scss";

type WindowSelectorProps = {
  selectedWindow: string;
  onChange: (value: string) => void;
};

const WindowSelector: React.FC<WindowSelectorProps> = ({
  selectedWindow,
  onChange,
}) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      className={styles.windowSelector}
      value={selectedWindow}
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
