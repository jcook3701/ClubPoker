import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { CalendarEvents } from "../types/calendar";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns filtered CalendarEvents object from chrome.local storage.
 */
const getCalendarEventsListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.GET_CALENDAR_EVENTS;
  const storageKey = StorageMap.GET_CALENDAR_EVENTS;
  onMessage(messageType, async () => {
    const events = await getLocalStorageItem<CalendarEvents>(storageKey);
    if (!events) {
      await sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendarData: events,
    };
    return response;
  });
};

export default getCalendarEventsListener;
