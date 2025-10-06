import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Saves Timezone object to chrome.sync storage and sends message
 * that timezone change has occured.
 */
const saveTimezoneListener = (): void => {
  const messageType = MessageTypes.SAVE_TIMEZONE;
  const warningCode = WarningCodeMap.SAVE_TIMEZONE;
  const storageKey = StorageMap.SAVE_TIMEZONE;
  onMessage(messageType, async (payload) => {
    const newTimezone = payload.timeZone;

    if (!newTimezone) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return failResponse;
    } else {
      await setSyncStorageItem(storageKey, newTimezone);
      sendMessage(MessageTypes.TIMEZONE_CHANGE);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveTimezoneListener;
