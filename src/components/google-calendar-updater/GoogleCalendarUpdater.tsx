import React, { useEffect, useState } from "react";
import { useCalendar } from "../../context/GoogleCalendarContext";
import { createEvent, fetchCalendarEvents } from "../../api/googleCalendarApi";
import { Calendar, CalendarEvent } from "../../types/calendar";
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

const GoogleCalendarUpdater: React.FC = () => {
  const { calendars, selectedCalendar, setSelectedCalendar, loading, error } =
    useCalendar();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);

  // Fetch events whenever selected calendar changes
  useEffect(() => {
    if (!selectedCalendar) return;

    const loadEvents = async () => {
      setEventLoading(true);
      try {
        const evs = await fetchCalendarEvents(selectedCalendar.id);
        setEvents(evs ?? []);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setEventError(err.message);
        else setEventError(String(err));
      } finally {
        setEventLoading(false);
      }
    };

    loadEvents();
  }, [selectedCalendar]);

  const handleCreateEvent = async () => {
    if (!selectedCalendar) return;

    const newEvent: CalendarEvent = {
      summary: "New Event",
      description: "Created from Club WPT extension",
      start: { dateTime: new Date().toISOString() },
      end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString() },
    };

    try {
      setEventLoading(true);
      await createEvent(selectedCalendar.id, newEvent);
      const evs = await fetchCalendarEvents(selectedCalendar.id);
      setEvents(evs ?? []);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setEventError(err.message);
      else setEventError(String(err));
    } finally {
      setEventLoading(false);
    }
  };

  if (loading || eventLoading) return <CircularProgress />;
  if (error || eventError)
    return <div style={{ color: "red" }}>{error || eventError}</div>;

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
        {"Google Calendars:"}
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
        {"Events:"}
      </Typography>
      <List className={styles.events}>
        {events.map((ev) => (
          <ListItem key={ev.id ?? ev.summary}>
            <ListItemText
              primary={ev.summary}
              secondary={ev.start?.dateTime ?? ev.start?.date}
            />
          </ListItem>
        ))}
      </List>
      <UpdateCalendarButton onClick={handleCreateEvent} />
    </Box>
  );
};

export default GoogleCalendarUpdater;
