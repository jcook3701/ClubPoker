import { MessageTypes } from "../constants/messages";

/*
 * Warning Codes
 */
export enum WarningCode {
  emptySyncStorage,
  emptyLocalStorage,
}

/*
 * Warning Message
 */
export interface WarningMessage {
  code: WarningCode;
  message: string;
  origin: MessageTypes;
  timestamp: Date;
}

/*
 * Formats a Warning object as a string.
 */
export const formatWarning = (warning: WarningMessage): string => {
  return `[${warning.code}] ${warning.message} (origin: ${
    warning.origin
  }, time: ${warning.timestamp.toISOString()})`;
};
