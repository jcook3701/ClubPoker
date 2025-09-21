import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";

const getCalendarListener = (): void => {
  const messageType = MessageTypes.GET_CALENDAR;
  onMessage(messageType, (payload) => {
    console.log("Updating settings:", payload);
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default getCalendarListener;
