import { listCalendars } from "../api/googleCalendarApi";
import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { buildDefaultFilters } from "../utils/filter/filterHelpers";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns Calendars List object from  storage or
 * default filters from filter constants
 */
const listCalendarsListener = (): void => {
  const messageType = MessageTypes.LIST_CALENDARS;
  const warningCode = WarningCodeMap.LIST_CALENDARS;
  // const storageKey = StorageMap.LIST_CALENDARS;
  onMessage(messageType, async () => {
    const calendars = await listCalendars();
    if (!calendars) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const resolvedCalendars = calendars;
    console.log("Get Filters: ", resolvedCalendars);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendars: resolvedCalendars,
    };
    return response;
  });
};

export default listCalendarsListener;
