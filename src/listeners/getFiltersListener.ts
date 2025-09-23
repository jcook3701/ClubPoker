import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { FiltersState } from "../types/filter";

/*
 * Returns FiltersState object from chrome.sync storage.
 */
const getFiltersListener = (): void => {
  const messageType = MessageTypes.GET_FILTERS;
  onMessage(messageType, () => {
    getSyncStorageItem<FiltersState>(SYNC_STORAGE_KEYS.filters).then(
      (filters) => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
          filters: filters ? filters : undefined,
        };
        return response;
      }
    );
  });
};

export default getFiltersListener;
