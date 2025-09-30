import { fetchCalendarEvents } from "../api/googleCalendarApi";
import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { CalendarEvents } from "../types/calendar";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns CalendarEvents object from  storage or
 * default filters from filter constants
 */
const fetchCalendarEventsListener = (): void => {
  const messageType = MessageTypes.FETCH_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.FETCH_CALENDAR_EVENTS;
  // const storageKey = StorageMap.LIST_CALENDARS;
  onMessage(messageType, async (payload) => {
    const calendar = payload.calendar;
    const events = await fetchCalendarEvents(calendar.id);
    if (!events) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    // TODO: Add filters here

    const resolvedEvents: CalendarEvents = {
      calendar: calendar,
      calendarEvents: events ?? [],
    };
    console.log("Get Filters: ", resolvedEvents);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendarData: resolvedEvents,
    };
    return response;
  });
};

export default fetchCalendarEventsListener;
