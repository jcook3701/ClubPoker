import { MessageTypes } from "../constants/messages";

/*
 * Warning Codes
 */
export enum WarningCode {
  emptySyncStorage,
  emptyLocalStorage,
  missingPayload,
}

/*
 * Warning Message
 */
export interface WarningMessage {
  code: WarningCode;
  origin: MessageTypes;
  timestamp: Date;
}

/*
 * Formats a Warning object as a string.
 */
export const formatWarningMessage = (warning: WarningMessage): string => {
  return `[${warning.code}] (origin: ${
    warning.origin
  }, time: ${warning.timestamp.toISOString()})`;
};
