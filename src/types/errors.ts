import { MessageTypes } from "../constants/messages";

/*
 * Error Codes
 */
export enum ErrorCode {
  emptySyncStorage,
  emptyLocalStorage,
  missingPayload,
}

/*
 * Error Message
 */
export interface ErrorMessage {
  code: ErrorCode;
  origin: MessageTypes;
  timestamp: Date;
}

/*
 * Formats a Error object as a string.
 */
export const formatErrorMessage = (error: ErrorMessage): string => {
  return `[${error.code}] (origin: ${
    error.origin
  }, time: ${error.timestamp.toISOString()})`;
};
