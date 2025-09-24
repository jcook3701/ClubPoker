import { MessageTypes } from "../constants/messages";
import { onMessage } from "../services/messageService";
import { formatWarning } from "../types/warnings";

/*
 * Handle Warnings sent by other listeners.
 * Intended to simplify future debuging.
 */
const warningListener = (): void => {
  const messageType = MessageTypes.WARNING;
  onMessage(messageType, (payload) => {
    const warning = payload.warning;
    console.warn(formatWarning(warning));
  });
};

export default warningListener;
