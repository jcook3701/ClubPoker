import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { DEFAULT_TIMEZONE } from "../constants/timezone";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import Timezone from "../types/Timezone";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns Timezone object from chrome.sync storage or
 * default timezone object from constants.
 */
const getTimezoneListener = (): void => {
  const messageType = MessageTypes.GET_TIMEZONE;
  const warningCode = WarningCodeMap.GET_TIMEZONE;
  const storageKey = StorageMap.GET_TIMEZONE;
  onMessage(messageType, async () => {
    const timezone = await getSyncStorageItem<Timezone>(storageKey);
    if (!timezone) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }
    const resolvedTimezone = timezone ?? DEFAULT_TIMEZONE;
    // console.log("Get Timezone: ", resolvedTimezone);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      timezone: resolvedTimezone,
    };
    return response;
  });
};

export default getTimezoneListener;
