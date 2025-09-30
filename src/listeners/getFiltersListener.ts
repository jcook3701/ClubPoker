import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { FiltersState } from "../types/filter";
import { buildDefaultFilters } from "../utils/filter/filterHelpers";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns FiltersState object from chrome.sync storage or
 * default filters from filter constants
 */
const getFiltersListener = (): void => {
  const messageType = MessageTypes.GET_FILTERS;
  const warningCode = WarningCodeMap.GET_FILTERS;
  const storageKey = StorageMap.GET_FILTERS;
  onMessage(messageType, async () => {
    const filters = await getSyncStorageItem<FiltersState>(storageKey);
    if (!filters) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const resolvedFilters = filters ?? buildDefaultFilters();
    // console.log("Get Filters: ", resolvedFilters);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      filters: resolvedFilters,
    };
    return response;
  });
};

export default getFiltersListener;
