import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";

const saveSettingsListener = (): void => {
  const messageType = MessageTypes.SAVE_SETTINGS;
  onMessage(messageType, (payload) => {
    console.log("Updating settings:", payload);
    return {
      success: true,
    } as ResponseMap[typeof messageType];
  });
};

export default saveSettingsListener;
