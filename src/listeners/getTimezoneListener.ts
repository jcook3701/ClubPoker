import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import Timezone from "../types/Timezone";

/*
 * Returns Timezone object from chrome.sync storage.
 */
const getTimezoneListener = (): void => {
  const messageType = MessageTypes.GET_TIMEZONE;
  onMessage(messageType, () => {
    getSyncStorageItem<Timezone>(SYNC_STORAGE_KEYS.timezone).then(
      (timezone) => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
          timezone: timezone ? timezone : undefined,
        };
        return response;
      }
    );
  });
};

export default getTimezoneListener;
