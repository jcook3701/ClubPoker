import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";

/*
 * Saves Calendar object to chrome.sync storage.
 */
const saveCalendarListener = (): void => {
  const messageType = MessageTypes.SAVE_CALENDAR;

  onMessage(messageType, (payload) => {
    setSyncStorageItem(SYNC_STORAGE_KEYS.calender, payload.calendar).then(
      () => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
        };
        return response;
      }
    );
  });
};

export default saveCalendarListener;
