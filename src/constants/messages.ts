import {
  AppSettings,
  Calendar,
  CalendarEvents,
  ErrorMessage,
  FiltersState,
  Timezone,
  Tournaments,
  WarningMessage,
} from "@types";

/*
 * Central list of message type names
 */
export const MessageTypes = {
  /* event messages */
  PAGE_RELOADED: "PAGE_RELOADED",
  SETTINGS_CHANGE: "SETTINGS_CHANGE",
  TIMEZONE_CHANGE: "TIMEZONE_CHANGE",
  ERROR: "ERROR",
  WARNING: "WARNING",
  /* chrome.sync storage messages */
  GET_CALENDAR: "GET_CALENDAR",
  GET_FILTERS: "GET_FILTERS",
  GET_SETTINGS: "GET_SETTINGS",
  GET_TIMEZONE: "GET_TIMEZONE",
  SAVE_CALENDAR: "SAVE_CALENDAR",
  SAVE_FILTERS: "SAVE_FILTERS",
  SAVE_SETTINGS: "SAVE_SETTINGS",
  SAVE_TIMEZONE: "SAVE_TIMEZONE",
  /* chrome.local storage messages */
  GET_CALENDAR_EVENTS: "GET_CALENDAR_EVENTS",
  GET_TOURNAMENTS: "GET_TOURNAMENTS",
  SAVE_CALENDAR_EVENTS: "SAVE_CALENDAR_EVENTS",
  SAVE_TOURNAMENTS: "SAVE_TOURNAMENTS",
  /* Google Calander API messages */
  LIST_CALENDARS: "LIST_CALENDARS",
  FETCH_CALENDAR_EVENTS: "FETCH_CALENDAR_EVENTS",
  CREATE_EVENT: "CREATE_EVENT",
} as const;

export type MessageTypes = (typeof MessageTypes)[keyof typeof MessageTypes];

/*
 *  Map each message type → its payload shape
 */
export type MessageMap = {
  /* event messages */
  [MessageTypes.PAGE_RELOADED]: undefined;
  [MessageTypes.SETTINGS_CHANGE]: undefined;
  [MessageTypes.TIMEZONE_CHANGE]: undefined;
  [MessageTypes.ERROR]: { error: ErrorMessage };
  [MessageTypes.WARNING]: { warning: WarningMessage };
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: undefined;
  [MessageTypes.GET_FILTERS]: undefined;
  [MessageTypes.GET_SETTINGS]: undefined;
  [MessageTypes.GET_TIMEZONE]: undefined;
  [MessageTypes.SAVE_CALENDAR]: { calendar: Calendar };
  [MessageTypes.SAVE_FILTERS]: { filters: FiltersState };
  [MessageTypes.SAVE_SETTINGS]: { settings: AppSettings };
  [MessageTypes.SAVE_TIMEZONE]: { timeZone: Timezone };
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: undefined;
  [MessageTypes.GET_TOURNAMENTS]: undefined;
  [MessageTypes.SAVE_CALENDAR_EVENTS]: { calendarData: CalendarEvents };
  [MessageTypes.SAVE_TOURNAMENTS]: { tournamentData: Tournaments };
  /* Google Calander API messages */
  [MessageTypes.LIST_CALENDARS]: undefined;
  [MessageTypes.FETCH_CALENDAR_EVENTS]: { calendar: Calendar };
  [MessageTypes.CREATE_EVENT]: { calendarData: CalendarEvents };
};

/*
 * Generic message type (for union across all messages)
 */
export type Message<T extends keyof MessageMap = keyof MessageMap> = {
  type: T;
  payload: MessageMap[T];
};
