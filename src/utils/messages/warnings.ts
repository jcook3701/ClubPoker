import { MessageTypes } from "../../constants/messages";
import { WarningCode, WarningMessage } from "../../types/warnings";

/**
 * Returns a properly formatted WarningMessage object.
 * @param code - short identifier for the warning
 * @param message - human-readable message
 * @param origin - the MessageType that triggered the warning
 */
export const createWarning = (
  code: WarningCode,
  message: string,
  origin: MessageTypes
): WarningMessage => ({
  code,
  message,
  origin,
  timestamp: new Date(),
});
