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
  Typography,
} from "@mui/material";

import styles from "./GoogleCalendarUpdater.module.scss";
import UpdateCalendarButton from "../buttons/UpdateCalendarButton";
import { formatDateHumanReadable } from "../../utils/time/timeZoneHelpers";
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
    handleCreateEvent,
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

      <Typography variant="subtitle2" noWrap>
        {"Poker Tournaments:"}
        <CalendarBadge events={events} />
      </Typography>
      <List className={styles.events}>
        {events.map((ev) => (
          <ListItem key={ev.id ?? ev.summary}>
            <ListItemText
              primary={ev.summary}
              secondary={
                <>
                  {ev.start?.dateTime
                    ? formatDateHumanReadable(ev.start.dateTime)
                    : formatDateHumanReadable(ev.start?.date)}
                  <br />
                  {ev.description}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <UpdateCalendarButton onClick={handleCreateEvent} />
    </Box>
  );
};

export default GoogleCalendarUpdater;
