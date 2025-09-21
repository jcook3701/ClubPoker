import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { Tournaments } from "../types/tournament";

/*
 * Returns a Tournaments object from chrome local storage.
 */
const getTournamentsListener = (): void => {
  const messageType = MessageTypes.GET_TOURNAMENTS;
  onMessage(messageType, () => {
    getLocalStorageItem<Tournaments>(LOCAL_STORAGE_KEYS.tournaments).then(
      (tournaments) => {
        const response: ResponseMap[typeof messageType] = {
          success: true,
          tournamentData: tournaments,
        };
        return response;
      }
    );
  });
};

export default getTournamentsListener;
