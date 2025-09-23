import { SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage, sendMessage } from "../services/messageService";
import { setSyncStorageItem } from "../services/storageService";
import Timezone from "../types/Timezone";

/*
 * Saves Timezone object to chrome.sync storage and sends message
 * that timezone change has occured.
 */
const saveTimezoneListener = (): void => {
  const messageType = MessageTypes.SAVE_TIMEZONE;

  onMessage(messageType, (payload) => {
    const newTimezone: Timezone | null = payload.timeZone;

    if (!newTimezone) {
      console.warn("No timezone set — skipping updates");
      return;
    }

    setSyncStorageItem(SYNC_STORAGE_KEYS.timezone, newTimezone).then(() => {
      sendMessage(MessageTypes.TIMEZONE_CHANGE);
      const response: ResponseMap[typeof messageType] = {
        success: true,
      };
      return response;
    });
  });
};

export default saveTimezoneListener;
