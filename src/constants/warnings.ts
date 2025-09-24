import { WarningCode } from "../types/warnings";
import { MessageTypes } from "./messages";

/*
 * map message warnings to keys in a chrome config object
 */
export const WarningCodeMap = {
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_FILTERS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_SETTINGS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_TIMEZONE]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_CALENDAR]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_FILTERS]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_SETTINGS]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_TIMEZONE]: WarningCode.emptySyncStorage,
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.GET_TOURNAMENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_TOURNAMENTS]: WarningCode.emptyLocalStorage,
} as const;
