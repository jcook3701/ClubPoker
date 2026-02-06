/*!
 * GoogleCalendarContext.tsx for ClubPoker Chrome Extension
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

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Calendar, CalendarEvent, CalendarEvents } from "@types";
import { sendMessage } from "@/services/messageService";
import { MessageTypes } from "@/constants/messages";
import { normalizeDateTime } from "@/utils/time/timeHelpers";

interface CalendarContextValue {
  calendars: Calendar[];
  selectedCalendar: Calendar | null;
  setSelectedCalendar: (calendar: Calendar | null) => void;
  calendarLoading: boolean;
  calendarError: string | null;
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  setEventsRefresh: (refresh: boolean) => void;
  eventsLoading: boolean;
  eventsError: string | null;
  handleCreateEvents: () => void;
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
  const [eventsRefresh, setEventsRefresh] = useState(false);
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
          `${e.summary}-${normalizeDateTime(
            e.start?.dateTime
          )}-${normalizeDateTime(e.end?.dateTime)}`;

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
        setEventsRefresh(false);
      }
    };

    loadSelectedCalendarEvents();
  }, [selectedCalendar, eventsRefresh]);

  const handleCreateEvents = async () => {
    if (!selectedCalendar) return;

    const newEvents: CalendarEvents = {
      calendar: selectedCalendar,
      calendarEvents: events,
      timestamp: new Date(),
    };

    try {
      setEventLoading(true);
      if (newEvents.calendar) {
        await sendMessage(MessageTypes.SAVE_CALENDAR, {
          calendar: newEvents.calendar,
        });
        if (newEvents.calendarEvents.length > 0) {
          await sendMessage(MessageTypes.CREATE_EVENT, {
            calendarData: newEvents,
          });
        }
        setEventsRefresh(true);
      }
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
        setEventsRefresh,
        eventsLoading,
        eventsError,
        handleCreateEvents,
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
