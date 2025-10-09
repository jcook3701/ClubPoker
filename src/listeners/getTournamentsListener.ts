import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { Tournaments } from "@types";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns a Tournaments object from chrome local storage.
 */
const getTournamentsListener = (): void => {
  const messageType = MessageTypes.GET_TOURNAMENTS;
  const warningCode = WarningCodeMap.GET_TOURNAMENTS;
  const storageKey = StorageMap.GET_TOURNAMENTS;
  onMessage(messageType, async () => {
    const tournaments = await getLocalStorageItem<Tournaments>(storageKey);

    if (!tournaments) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }

    const response: ResponseMap[typeof messageType] = {
      success: true,
      tournamentData: tournaments,
    };
    return response;
  });
};

export default getTournamentsListener;
