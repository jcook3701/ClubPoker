import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";

/*
 *
 */
const warningListener = (): void => {
  const messageType = MessageTypes.WARNING;
  onMessage(messageType, () => {
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default warningListener;
