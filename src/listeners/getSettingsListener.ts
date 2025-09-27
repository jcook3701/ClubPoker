import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { DEFAULT_SETTINGS } from "../constants/settings";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { AppSettings } from "../types/settings";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns Settings object from chrome.sync storage or
 * default settings object from constants.
 */
const getSettingsListener = (): void => {
  const messageType = MessageTypes.GET_SETTINGS;
  const warningCode = WarningCodeMap.GET_SETTINGS;
  const storageKey = StorageMap.GET_SETTINGS;
  onMessage(messageType, async () => {
    const settings = await getSyncStorageItem<AppSettings>(storageKey);
    if (!settings) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }
    const resolvedSettings = settings ?? DEFAULT_SETTINGS;
    console.log("resolvedSettings: ", resolvedSettings);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      settings: resolvedSettings,
    };
    return response;
  });
};

export default getSettingsListener;
