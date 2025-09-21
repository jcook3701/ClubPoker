import Timezone from "../types/Timezone";
import { MessageTypes } from "./messages";
import { Tournaments } from "../types/tournament";

/* Map each request type → response payload shape */
export type ResponseMap = {
  [MessageTypes.GET_TOURNAMENTS]: {
    success: boolean;
    tournamentData: Tournaments | null;
  };
  [MessageTypes.GET_CALENDAR]: { success: boolean }; // TODO: events?: any[]
  [MessageTypes.PAGE_RELOADED]: { success: boolean };
  [MessageTypes.SAVE_SETTINGS]: { success: boolean };
  [MessageTypes.SAVE_TIMEZONE]: { success: boolean; timezone?: Timezone };
  [MessageTypes.SAVE_TOURNAMENTS]: { success: boolean };
};

/* Generic response type (for union across all responses) */
export type Response<T extends keyof ResponseMap = keyof ResponseMap> = {
  type: T;
  payload: ResponseMap[T];
};
