import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { formatWarningMessage } from "../types/warnings";

/*
 * Handles warning messages
 * Intended to simplify message debuging.
 */
const warningListener = (): void => {
  const messageType = MessageTypes.WARNING;
  onMessage(messageType, async (payload) => {
    const warning = payload.warning;
    console.warn(formatWarningMessage(warning));
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default warningListener;
