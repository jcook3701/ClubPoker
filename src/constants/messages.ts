import Timezone from "../types/Timezone";

/* Central list of message type names */
export const MessageTypes = {
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
  TIMEZONE_UPDATED: "TIMEZONE_UPDATED",
  TOURNAMENTS_UPDATED: "TOURNAMENTS_UPDATED",
  FETCH_CALENDAR: "FETCH_CALENDAR",
} as const;

/* Map each message type → its payload shape */
export type MessageMap = {
  [MessageTypes.UPDATE_SETTINGS]: { darkMode: boolean };
  [MessageTypes.TIMEZONE_UPDATED]: { timeZone: Timezone | null };
  [MessageTypes.TOURNAMENTS_UPDATED]: { timezone: Timezone };
  [MessageTypes.FETCH_CALENDAR]: { date: string };
};

/* Generic message type (for union across all messages) */
export type Message<T extends keyof MessageMap = keyof MessageMap> = {
  type: T;
  payload: MessageMap[T];
};
