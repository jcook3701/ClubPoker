import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import { createWarning } from "../utils/messages/warnings";

/*
 * Saves FiltersState object to chrome.sync storage.
 */
const saveFiltersListener = (): void => {
  const messageType = MessageTypes.SAVE_FILTERS;
  const warningCode = WarningCodeMap.SAVE_FILTERS;
  const storageKey = StorageMap.SAVE_FILTERS;
  onMessage(messageType, async (payload) => {
    const newFilters = payload.filters;

    if (!newFilters) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      await setSyncStorageItem(storageKey, newFilters);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveFiltersListener;
