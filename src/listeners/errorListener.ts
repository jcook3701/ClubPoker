import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { formatErrorMessage } from "../types/errors";

/*
 * Handles Error Messages
 */
const errorListener = (): void => {
  const messageType = MessageTypes.ERROR;
  onMessage(messageType, async (payload) => {
    const error = payload.error;
    console.error(formatErrorMessage(error));
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default errorListener;
