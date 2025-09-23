import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";

/*
 * Saves FiltersState object to chrome.sync storage.
 */
const saveFiltersListener = (): void => {
  const messageType = MessageTypes.SAVE_FILTERS;

  onMessage(messageType, (payload) => {
    setSyncStorageItem(SYNC_STORAGE_KEYS.filters, payload.filters).then(() => {
      const response: ResponseMap[typeof messageType] = {
        success: true,
      };
      return response;
    });
  });
};

export default saveFiltersListener;
