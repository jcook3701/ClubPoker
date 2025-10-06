import { createEvent } from "../api/googleCalendarApi";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { CalendarEvent, CalendarEvents } from "../types/calendar";
import { createWarning } from "../utils/messages/warnings";

/*
 * Creates Google Calendar Event using the Google Calendar API
 * Returns CalendarEvents
 */
const createEventsListener = (): void => {
  const messageType = MessageTypes.CREATE_EVENT;
  const warningCode = WarningCodeMap.CREATE_EVENT;
  onMessage(messageType, async (payload) => {
    const calendar = payload.calendarData.calendar;
    const events = payload.calendarData.calendarEvents;
    const timestamp = payload.calendarData.timestamp;
    if (calendar) {
      const savedEvents: CalendarEvent[] = await Promise.all(
        events.map((event) => {
          return createEvent(calendar.id, event);
        })
      );

      const resolvedEvents: CalendarEvents = {
        calendar: calendar,
        calendarEvents: savedEvents,
        timestamp: timestamp,
      };
      const response: ResponseMap[typeof messageType] = {
        success: false,
        calendarData: resolvedEvents,
      };
      return response;
    } else {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const response: ResponseMap[typeof messageType] = {
        success: false,
        calendarData: undefined,
      };
      return response;
    }
  });
};

export default createEventsListener;
