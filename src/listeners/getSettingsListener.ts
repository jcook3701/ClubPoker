import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { Settings } from "../types/settings";

/*
 * Returns Settings object from chrome.sync storage.
 */
const getSettingsListener = (): void => {
  const messageType = MessageTypes.GET_SETTINGS;
  onMessage(messageType, () => {
    getSyncStorageItem<Settings>(SYNC_STORAGE_KEYS.settings).then(
      (settings) => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
          settings: settings ? settings : undefined,
        };
        return response;
      }
    );
  });
};

export default getSettingsListener;
