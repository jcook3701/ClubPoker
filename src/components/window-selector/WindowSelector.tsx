import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter"; // Filters page
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // update Google Calander
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // update time page

import styles from "./WindowSelector.module.scss";
import TimezoneSelect from "../timezone-select/TimezoneSelect";
import Filters from "../filters/Filters";
import GoogleCalendarUpdater from "../google-calendar-updater/GoogleCalendarUpdater";

type WindowSelectorProps = {
  selectedWindow: string;
  onChange: (value: string) => void;
};

const WindowSelector: React.FC<WindowSelectorProps> = ({
  selectedWindow,
  onChange,
}) => {
  const COMPONENTS: Record<string, React.ReactNode> = {
    timezone: <TimezoneSelect />,
    filter: <Filters />,
    calendar: <GoogleCalendarUpdater />,
  };

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        className={styles.windowSelector}
        value={selectedWindow}
        exclusive
        onChange={handleChange}
        fullWidth
        sx={{
          mt: 1, // adds spacing above the buttons
        }}
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
      {COMPONENTS[selectedWindow] ?? null}
    </Box>
  );
};

export default WindowSelector;
