import Timezone from "../types/Timezone";
import { Tournament, Tournaments } from "../types/tournament";

/*
 * Central list of message type names
 */
export const MessageTypes = {
  GET_TOURNAMENTS: "GET_TOURNAMENTS",
  GET_CALENDAR: "GET_CALENDAR",
  PAGE_RELOADED: "PAGE_RELOADED",
  SAVE_SETTINGS: "SAVE_SETTINGS",
  SAVE_TIMEZONE: "SAVE_TIMEZONE",
  SAVE_TOURNAMENTS: "SAVE_TOURNAMENTS",
} as const;

/*
 *  Map each message type → its payload shape
 *
 */
export type MessageMap = {
  [MessageTypes.GET_TOURNAMENTS]: undefined;
  [MessageTypes.GET_CALENDAR]: { date: string };
  [MessageTypes.PAGE_RELOADED]: undefined;
  [MessageTypes.SAVE_SETTINGS]: { darkMode: boolean };
  [MessageTypes.SAVE_TIMEZONE]: { timeZone: Timezone | null };
  [MessageTypes.SAVE_TOURNAMENTS]: { tournamentData: Tournaments };
};

/*
 * Generic message type (for union across all messages)
 */
export type Message<T extends keyof MessageMap = keyof MessageMap> = {
  type: T;
  payload: MessageMap[T];
};
