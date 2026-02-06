/*!
 * GoogleCalendarUpdater.tsx for ClubPoker Chrome Extension
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
import { useGoogleCalendar } from "@/context/GoogleCalendarContext";
import {
  Autocomplete,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import styles from "./GoogleCalendarUpdater.module.scss";
import UpdateCalendarButton from "@/components/buttons/UpdateCalendarButton";
import { formatCalendarTime } from "@/utils/time/timeHelpers";
import CalendarBadge from "@/components/badges/CalendarBadge";

const GoogleCalendarUpdater: React.FC = () => {
  const {
    calendars,
    selectedCalendar,
    setSelectedCalendar,
    calendarLoading,
    calendarError,
    events,
    eventsLoading,
    eventsError,
    handleCreateEvents,
  } = useGoogleCalendar();

  if (calendarLoading || eventsLoading) return <CircularProgress />;
  if (calendarError || eventsError)
    return <div style={{ color: "red" }}>{calendarError || eventsError}</div>;

  const handleSelectChange = (
    _event: React.SyntheticEvent,
    option: { value: string; label: string } | null
  ) => {
    if (option) {
      const cal = calendars.find((c) => c.id === option.value);
      setSelectedCalendar(cal ?? null);
    }
  };

  const updateCalendar = async () => {
    handleCreateEvents();
  };

  return (
    <Box className={styles.googleCalendarUpdator}>
      <Typography variant="subtitle1" noWrap>
        {"Google Calendar Updater:"}
      </Typography>
      <Autocomplete
        options={calendars.map((cal) => ({
          value: cal.id,
          label: cal.summary,
        }))}
        value={
          selectedCalendar
            ? { value: selectedCalendar.id, label: selectedCalendar.summary }
            : null
        }
        onChange={(event, option) => {
          handleSelectChange(event, option);
        }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Calendar" variant="outlined" />
        )}
        fullWidth
      />
      <Toolbar>
        <Typography variant="subtitle2" noWrap>
          {"Poker Tournaments:"}
        </Typography>
        <CalendarBadge events={events} />
      </Toolbar>
      <List className={styles.events}>
        {events.map((ev, index) => (
          <ListItem
            key={ev.id ?? ev.summary}
            sx={(theme) => ({
              backgroundColor:
                index % 2 === 0
                  ? theme.palette.background.paper
                  : theme.palette.action.hover, // alternating>
            })}
          >
            <ListItemText
              primary={ev.summary}
              secondary={
                <>
                  {ev.start?.dateTime
                    ? formatCalendarTime(ev.start.dateTime)
                    : formatCalendarTime(ev.start?.date)}
                  <br />
                  {ev.description}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <UpdateCalendarButton onClick={updateCalendar} />
    </Box>
  );
};

export default GoogleCalendarUpdater;
