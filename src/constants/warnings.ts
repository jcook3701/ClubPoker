import { WarningCode } from "../types/warnings";
import { MessageTypes } from "./messages";

/*
 * map message warnings to keys in a chrome config object
 */
export const WarningCodeMap = {
  /* event messages */
  [MessageTypes.PAGE_RELOADED]: undefined,
  [MessageTypes.SETTINGS_CHANGE]: undefined,
  [MessageTypes.TIMEZONE_CHANGE]: undefined,
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_FILTERS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_SETTINGS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_TIMEZONE]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_CALENDAR]: WarningCode.missingPayload,
  [MessageTypes.SAVE_FILTERS]: WarningCode.missingPayload,
  [MessageTypes.SAVE_SETTINGS]: WarningCode.missingPayload,
  [MessageTypes.SAVE_TIMEZONE]: WarningCode.missingPayload,
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.GET_TOURNAMENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_TOURNAMENTS]: WarningCode.emptyLocalStorage,
} as const;
