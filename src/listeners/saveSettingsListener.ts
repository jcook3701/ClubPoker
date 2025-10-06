import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Saves app settings to chrome.sync storage.
 */
const saveSettingsListener = (): void => {
  const messageType = MessageTypes.SAVE_SETTINGS;
  const warningCode = WarningCodeMap.SAVE_SETTINGS;
  const storageKey = StorageMap.SAVE_SETTINGS;
  onMessage(messageType, async (payload) => {
    const newSettings = payload.settings;
    if (!newSettings) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      await setSyncStorageItem(storageKey, newSettings);
      sendMessage(MessageTypes.SETTINGS_CHANGE);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveSettingsListener;
