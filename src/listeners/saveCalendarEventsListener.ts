import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";

/*
 * Saves CalendarEvents object to chrome.local storage.
 */
const saveCalendarEventsListener = (): void => {
  const messageType = MessageTypes.SAVE_CALENDAR_EVENTS;

  onMessage(messageType, (payload) => {
    setSyncStorageItem(
      LOCAL_STORAGE_KEYS.calendarEvents,
      payload.calendarData
    ).then(() => {
      const response: ResponseMap[typeof messageType] = {
        success: true,
      };
      return response;
    });
  });
};

export default saveCalendarEventsListener;
