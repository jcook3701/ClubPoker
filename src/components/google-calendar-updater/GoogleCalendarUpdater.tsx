import React from "react";
import { useGoogleCalendar } from "../../context/GoogleCalendarContext";
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
import UpdateCalendarButton from "../buttons/UpdateCalendarButton";
import { formatCalendarTime } from "../../utils/time/timeHelpers";
import CalendarBadge from "../badges/CalendarBadge";

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
