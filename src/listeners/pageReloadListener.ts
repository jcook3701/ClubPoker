import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { removeLocalStorageItem } from "../services/storageService";

/*
 * On page reload clear tournaments from Local Storage.
 */
const pageReloadListener = (): void => {
  const messageType = MessageTypes.PAGE_RELOADED;

  onMessage(messageType, () => {
    removeLocalStorageItem(LOCAL_STORAGE_KEYS.tournaments);

    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default pageReloadListener;
