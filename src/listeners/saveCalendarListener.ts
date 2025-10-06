import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Saves Calendar object to chrome.sync storage.
 */
const saveCalendarListener = (): void => {
  const messageType = MessageTypes.SAVE_CALENDAR;
  const warningCode = WarningCodeMap.SAVE_CALENDAR;
  const storageKey = StorageMap.SAVE_CALENDAR;
  onMessage(messageType, async (payload) => {
    const newCalendar = payload.calendar;

    if (!newCalendar) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      await setSyncStorageItem(storageKey, payload.calendar);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveCalendarListener;
