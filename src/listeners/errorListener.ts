import { MessageTypes } from "../constants/messages";
import { onMessage } from "../services/messageService";

/*
 *
 */
const errorListener = (): void => {
  const messageType = MessageTypes.ERROR;
  onMessage(messageType, (payload) => {
    const error = payload;
  });
};

export default errorListener;
