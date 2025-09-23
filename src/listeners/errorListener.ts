import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";

/*
 *
 */
const errorListener = (): void => {
  const messageType = MessageTypes.ERROR;
  onMessage(messageType, () => {
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default errorListener;
