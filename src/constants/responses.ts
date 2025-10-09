import {
  AppSettings,
  Calendar,
  CalendarEvents,
  FiltersState,
  Timezone,
  Tournaments,
} from "@types";
import { MessageTypes } from "./messages";

/* Map each request type → response payload shape */
export type ResponseMap = {
  /* event responses */
  [MessageTypes.PAGE_RELOADED]: { success: boolean };
  [MessageTypes.SETTINGS_CHANGE]: { success: boolean };
  [MessageTypes.TIMEZONE_CHANGE]: { success: boolean };
  [MessageTypes.WARNING]: { success: boolean };
  [MessageTypes.ERROR]: { success: boolean };
  /* chrome.sync storage responses */
  [MessageTypes.GET_CALENDAR]: {
    success: boolean;
    calendar?: Calendar;
  };
  [MessageTypes.GET_FILTERS]: {
    success: boolean;
    filters: FiltersState;
  };
  [MessageTypes.GET_SETTINGS]: {
    success: boolean;
    settings: AppSettings;
  };
  [MessageTypes.GET_TIMEZONE]: {
    success: boolean;
    timezone: Timezone;
  };
  [MessageTypes.SAVE_CALENDAR]: { success: boolean };
  [MessageTypes.SAVE_FILTERS]: { success: boolean };
  [MessageTypes.SAVE_SETTINGS]: { success: boolean };
  [MessageTypes.SAVE_TIMEZONE]: { success: boolean };
  /* chrome.local storage responses */
  [MessageTypes.GET_CALENDAR_EVENTS]: {
    success: boolean;
    calendarData: CalendarEvents | null;
  };
  [MessageTypes.GET_TOURNAMENTS]: {
    success: boolean;
    tournamentData: Tournaments | null;
  };
  [MessageTypes.SAVE_CALENDAR_EVENTS]: { success: boolean };
  [MessageTypes.SAVE_TOURNAMENTS]: { success: boolean };
  /* Google Calander API messages */
  [MessageTypes.LIST_CALENDARS]: { success: boolean; calendars: Calendar[] };
  [MessageTypes.FETCH_CALENDAR_EVENTS]: {
    success: boolean;
    calendarData: CalendarEvents;
  };
  [MessageTypes.CREATE_EVENT]: {
    success: boolean;
    calendarData?: CalendarEvents;
  };
};

/* Generic response type (for union across all responses) */
export type Response<T extends keyof ResponseMap = keyof ResponseMap> = {
  type: T;
  payload: ResponseMap[T];
};
