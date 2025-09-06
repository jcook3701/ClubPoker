import React, { useEffect, useState } from "react";
import { useCalendar } from "../../context/GoogleCalendarContext";
import { createEvent, fetchCalendarEvents } from "../../api/googleCalendarApi";
import { Calendar, CalendarEvent } from "../../types/calendar";

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
    <div>
      <h2>Google Calendars</h2>
      <select
        value={selectedCalendar?.id || ""}
        onChange={(e) => {
          const cal = calendars.find((c) => c.id === e.target.value);
          setSelectedCalendar(cal ?? null);
        }}
      >
        {calendars.map((cal) => (
          <option key={cal.id} value={cal.id}>
            {cal.summary}
          </option>
        ))}
      </select>

      <h3>Events</h3>
      <ul>
        {events.map((ev) => (
          <li key={ev.id ?? ev.summary}>
            {ev.summary} ({ev.start?.dateTime ?? ev.start?.date})
          </li>
        ))}
      </ul>

      <button onClick={handleCreateEvent}>Create Test Event</button>
    </div>
  );
};

export default GoogleCalendarUpdater;
