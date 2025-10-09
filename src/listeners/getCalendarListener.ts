import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { Calendar } from "@types";

/*
 * Returns Calendar object from chrome.sync storage.
 */
const getCalendarListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR;
  const storageKey = StorageMap.GET_CALENDAR;
  onMessage(messageType, async () => {
    const calendar = await getSyncStorageItem<Calendar>(storageKey);
    const resolvedCalendar = calendar ?? undefined;
    const response: ResponseMap[typeof messageType] = {
      success: true,
      calendar: resolvedCalendar,
    };
    return response;
  });
};

export default getCalendarListener;
