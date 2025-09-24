import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { WptFilterMap } from "../constants/filters";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { FiltersState } from "../types/filter";
import { buildDefaultFilters } from "../utils/filter/filterHelpers";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns FiltersState object from chrome.sync storage.
 */
const getFiltersListener = (): void => {
  const messageType = MessageTypes.GET_FILTERS;
  const warningCode = WarningCodeMap.GET_FILTERS;
  onMessage(messageType, () => {
    getSyncStorageItem<FiltersState>(SYNC_STORAGE_KEYS.filters).then(
      (filters) => {
        if (!filters) {
          sendMessage(MessageTypes.WARNING, {
            warning: createWarning(warningCode, "", messageType),
          });
        }

        const resolvedFilters = filters ?? buildDefaultFilters();

        const response: ResponseMap[typeof messageType] = {
          success: true,
          filters: resolvedFilters,
        };
        return response;
      }
    );
  });
};

export default getFiltersListener;
