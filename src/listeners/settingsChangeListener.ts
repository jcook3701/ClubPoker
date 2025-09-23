import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";

import { onMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";

/*
 * Handles DOM updates when settings are modified within chrome.sync storage.
 */
const settingsChangeListener = (): void => {
  const messageType = MessageTypes.SETTINGS_CHANGE;
  onMessage(messageType, () => {
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default settingsChangeListener;
