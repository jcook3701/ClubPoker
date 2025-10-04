import { fetchCalendarEvents } from "../api/googleCalendarApi";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { CalendarEvents } from "../types/calendar";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns CalendarEvents object from Google Calendar API
 */
const fetchCalendarEventsListener = (): void => {
  const messageType = MessageTypes.FETCH_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.FETCH_CALENDAR_EVENTS;
  onMessage(messageType, async (payload) => {
    const calendar = payload.calendar;
    const events = await fetchCalendarEvents(calendar.id);
    if (!events) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const resolvedEvents: CalendarEvents = {
      calendar: calendar,
      calendarEvents: events ?? [],
      timestamp: new Date(),
    };
    // console.log("Resolved Events: ", resolvedEvents);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendarData: resolvedEvents,
    };
    return response;
  });
};

export default fetchCalendarEventsListener;
