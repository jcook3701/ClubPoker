import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Calendar, CalendarEvent } from "../types/calendar";
import { sendMessage } from "../services/messageService";
import { MessageTypes } from "../constants/messages";
import { createEvent, fetchCalendarEvents } from "../api/googleCalendarApi";

interface CalendarContextValue {
  calendars: Calendar[];
  selectedCalendar: Calendar | null;
  setSelectedCalendar: (calendar: Calendar | null) => void;
  calendarLoading: boolean;
  calendarError: string | null;
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  eventsLoading: boolean;
  eventsError: string | null;
  handleCreateEvent: () => void;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null
  );
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventLoading] = useState(false);
  const [eventsError, setEventError] = useState<string | null>(null);

  useEffect(() => {
    const loadCalendars = async () => {
      setCalendarLoading(true);
      try {
        const userSelectedCalenderResponse = await sendMessage(
          MessageTypes.GET_CALENDAR
        );
        const userSelectedCalender = userSelectedCalenderResponse.calendar;
        const listCalendarsResponse = await sendMessage(
          MessageTypes.LIST_CALENDARS
        );
        const cals = listCalendarsResponse.calendars;
        setCalendars(cals);
        if (userSelectedCalender) {
          setSelectedCalendar(userSelectedCalender);
        } else if (cals.length > 0) {
          setSelectedCalendar(cals[0]);
        }
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setCalendarError(err.message);
        else setCalendarError(String(err));
      } finally {
        setCalendarLoading(false);
      }
    };

    loadCalendars();
  }, []);

  // Fetch events whenever selected calendar changes
  useEffect(() => {
    if (!selectedCalendar) return;

    const loadSelectedCalendarEvents = async () => {
      setEventLoading(true);
      try {
        const googleCalendarEventsResponse = await sendMessage(
          MessageTypes.FETCH_CALENDAR_EVENTS,
          {
            calendar: selectedCalendar,
          }
        );
        const googleCalendarEvents =
          googleCalendarEventsResponse.calendarData.calendarEvents;
        const tournamentEventsResponse = await sendMessage(
          MessageTypes.GET_CALENDAR_EVENTS
        );
        const tournamentEvents =
          tournamentEventsResponse.calendarData?.calendarEvents ?? [];

        // Create a stable key for duplicate detection
        const eventKey = (e: CalendarEvent): string =>
          `${e.summary}-${e.start.dateTime}-${e.end.dateTime}`;

        const existingKeys = new Set(googleCalendarEvents.map(eventKey));

        // Filter out tournament events that already exist
        const newTournamentEvents = tournamentEvents.filter(
          (t) => !existingKeys.has(eventKey(t))
        );
        setEvents([...newTournamentEvents]);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setEventError(err.message);
        else setEventError(String(err));
      } finally {
        setEventLoading(false);
      }
    };

    loadSelectedCalendarEvents();
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

  return (
    <CalendarContext.Provider
      value={{
        calendars,
        selectedCalendar,
        setSelectedCalendar,
        calendarLoading,
        calendarError,
        events,
        setEvents,
        eventsLoading,
        eventsError,
        handleCreateEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useGoogleCalendar = (): CalendarContextValue => {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider");
  return context;
};
