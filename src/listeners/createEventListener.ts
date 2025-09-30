import { createEvent, fetchCalendarEvents } from "../api/googleCalendarApi";
import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { CalendarEvent, CalendarEvents } from "../types/calendar";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns CalendarEvents object from  storage or
 * default filters from filter constants
 */
const createEventsListener = (): void => {
  const messageType = MessageTypes.CREATE_EVENT;
  const warningCode = WarningCodeMap.CREATE_EVENT;
  // const storageKey = StorageMap.CREATE_EVENT;
  onMessage(messageType, async (payload) => {
    const calendar = payload.calendarData.calendar;
    const events = payload.calendarData.calendarEvents;
    if (calendar) {
      const savedEvents: CalendarEvent[] = await Promise.all(
        events.map((event) => {
          return createEvent(calendar.id, event);
        })
      );

      const resolvedEvents: CalendarEvents = {
        calendar: calendar,
        calendarEvents: savedEvents,
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
