import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { Calendar } from "../types/calendar";

/*
 * Returns Calendar object from chrome.sync storage.
 */
const getCalendarListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR;
  onMessage(messageType, () => {
    getSyncStorageItem<Calendar>(SYNC_STORAGE_KEYS.calendar).then(
      (calendar) => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
          calendar: calendar ? calendar : undefined,
        };
        return response;
      }
    );
  });
};

export default getCalendarListener;
