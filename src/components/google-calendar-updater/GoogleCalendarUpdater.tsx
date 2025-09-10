import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useCalendar } from "../../context/GoogleCalendarContext";
import { createEvent, fetchCalendarEvents } from "../../api/googleCalendarApi";
import { Calendar, CalendarEvent } from "../../types/calendar";
import { Button } from "@mui/material";

import styles from "./GoogleCalendarUpdater.module.scss";

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

  if (loading || eventLoading) return <div>Loading...</div>;
  if (error || eventError)
    return <div style={{ color: "red" }}>{error || eventError}</div>;

  return (
    <div className={styles.googleCalendarUpdator}>
      <h2>Google Calendars</h2>
      <Select
        value={
          selectedCalendar
            ? { value: selectedCalendar.id, label: selectedCalendar.summary }
            : null
        }
        onChange={(option) => {
          const cal = calendars.find((c) => c.id === option?.value);
          setSelectedCalendar(cal ?? null);
        }}
        options={calendars.map((cal) => ({
          value: cal.id,
          label: cal.summary,
        }))}
        placeholder="Select a calendar..."
      />

      <h3>Events</h3>
      <ul>
        {events.map((ev) => (
          <li key={ev.id ?? ev.summary}>
            {ev.summary} ({ev.start?.dateTime ?? ev.start?.date})
          </li>
        ))}
      </ul>

      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Create Test Event
      </Button>
    </div>
  );
};

export default GoogleCalendarUpdater;
