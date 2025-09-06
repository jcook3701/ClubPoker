import React, { useEffect, useState } from "react";
import {
  createEvent,
  listCalendars,
  fetchCalendarEvents,
} from "../../api/googleCalendarApi";
import { Calendar, CalendarEvent } from "../../types/calendar";

import styles from "./GoogleCalendarUpdater.module.scss";

const GoogleCalendarUpdater: React.FC = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch list of calendars when component mounts
  useEffect(() => {
    const loadCalendars = async () => {
      setLoading(true);
      try {
        const cals = await listCalendars();
        setCalendars(cals);
        if (cals.length > 0) setSelectedCalendar(cals[0]);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    loadCalendars();
  }, []);

  // Fetch events whenever the selected calendar changes
  useEffect(() => {
    if (!selectedCalendar) return;

    const loadEvents = async () => {
      setLoading(true);
      try {
        const evs = await fetchCalendarEvents(selectedCalendar.id);
        setEvents(evs ?? []);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
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
      end: { dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString() }, // 1 hour later
    };

    try {
      setLoading(true);
      await createEvent(selectedCalendar.id, newEvent);
      const evs = await fetchCalendarEvents(selectedCalendar.id);
      setEvents(evs ?? []);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

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
