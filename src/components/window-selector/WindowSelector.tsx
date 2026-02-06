/*!
 * WindowSelector.tsx for ClubPoker Chrome Extension
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
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter"; // Filters page
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // update Google Calendar
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // update time page

import styles from "./WindowSelector.module.scss";
import TimezoneSelect from "@/components/timezone-select/TimezoneSelect";
import Filters from "@/components/filters/Filters";
import GoogleCalendarUpdater from "@/components/google-calendar-updater/GoogleCalendarUpdater";

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
