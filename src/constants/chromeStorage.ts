import { LOCAL_STORAGE_KEYS, SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "./messages";

/*
 * map message warnings to keys in a chrome config object
 */
export const MessageToStorageMap = {
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: SYNC_STORAGE_KEYS.calendar,
  [MessageTypes.GET_FILTERS]: SYNC_STORAGE_KEYS.filters,
  [MessageTypes.GET_SETTINGS]: SYNC_STORAGE_KEYS.settings,
  [MessageTypes.GET_TIMEZONE]: SYNC_STORAGE_KEYS.timezone,
  [MessageTypes.SAVE_CALENDAR]: SYNC_STORAGE_KEYS.calendar,
  [MessageTypes.SAVE_FILTERS]: SYNC_STORAGE_KEYS.filters,
  [MessageTypes.SAVE_SETTINGS]: SYNC_STORAGE_KEYS.settings,
  [MessageTypes.SAVE_TIMEZONE]: SYNC_STORAGE_KEYS.timezone,
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: LOCAL_STORAGE_KEYS.calendarEvents,
  [MessageTypes.GET_TOURNAMENTS]: LOCAL_STORAGE_KEYS.tournaments,
  [MessageTypes.SAVE_CALENDAR_EVENTS]: LOCAL_STORAGE_KEYS.calendarEvents,
  [MessageTypes.SAVE_TOURNAMENTS]: LOCAL_STORAGE_KEYS.tournaments,
} as const;
