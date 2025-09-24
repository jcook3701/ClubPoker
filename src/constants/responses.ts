import Timezone from "../types/Timezone";
import { MessageTypes } from "./messages";
import { Tournaments } from "../types/tournament";
import { Calendar, CalendarEvents } from "../types/calendar";
import { Settings } from "../types/settings";
import { FiltersState } from "../types/filter";
import { WarningMessage } from "../types/warnings";

/* Map each request type → response payload shape */
export type ResponseMap = {
  /* event responses */
  [MessageTypes.PAGE_RELOADED]: { success: boolean };
  [MessageTypes.SETTINGS_CHANGE]: { success: boolean };
  [MessageTypes.TIMEZONE_CHANGE]: { success: boolean };
  [MessageTypes.WARNING]: undefined;
  [MessageTypes.ERROR]: undefined;
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
    settings?: Settings;
  };
  [MessageTypes.GET_TIMEZONE]: {
    success: boolean;
    timezone?: Timezone;
  };
  [MessageTypes.SAVE_CALENDAR]: { success: boolean };
  [MessageTypes.SAVE_FILTERS]: { success: boolean };
  [MessageTypes.SAVE_SETTINGS]: { success: boolean };
  [MessageTypes.SAVE_TIMEZONE]: { success: boolean };
  /* chrome.local storage responses */
  [MessageTypes.GET_CALENDAR_EVENTS]: {
    success: boolean;
    calendarData?: CalendarEvents;
  };
  [MessageTypes.GET_TOURNAMENTS]: {
    success: boolean;
    tournamentData: Tournaments | null;
  };
  [MessageTypes.SAVE_CALENDAR_EVENTS]: { success: boolean };
  [MessageTypes.SAVE_TOURNAMENTS]: { success: boolean };
};

/* Generic response type (for union across all responses) */
export type Response<T extends keyof ResponseMap = keyof ResponseMap> = {
  type: T;
  payload: ResponseMap[T];
};
