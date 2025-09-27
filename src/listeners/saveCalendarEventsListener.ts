import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Saves CalendarEvents object to chrome.local storage.
 */
const saveCalendarEventsListener = (): void => {
  const messageType = MessageTypes.SAVE_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.SAVE_CALENDAR_EVENTS;
  const storageKey = StorageMap.SAVE_CALENDAR_EVENTS;

  onMessage(messageType, async (payload) => {
    const newCalendarEvents = payload.calendarData;

    if (!newCalendarEvents) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      await setSyncStorageItem(storageKey, newCalendarEvents);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveCalendarEventsListener;
