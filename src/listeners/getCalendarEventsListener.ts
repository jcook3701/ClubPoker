import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { CalendarEvents } from "../types/calendar";

/*
 * Returns CalendarEvents object from chrome.local storage.
 */
const getCalendarEventsListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR_EVENTS;
  onMessage(messageType, async () => {
    const calendarData = await getSyncStorageItem<CalendarEvents>(
      LOCAL_STORAGE_KEYS.calendarEvents
    );
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendarData: calendarData ? calendarData : undefined,
    };
    return response;
  });
};

export default getCalendarEventsListener;
