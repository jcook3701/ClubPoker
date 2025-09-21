import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { onMessage } from "../services/messageService";
import { setLocalStorageItem } from "../services/storageService";

/*
 * Saves Tournmants object payload to chrome local storage.
 */
const saveTournamentsListener = (): void => {
  const messageType = MessageTypes.SAVE_TOURNAMENTS;
  onMessage(messageType, (payload) => {
    console.log("saving: ----------------");
    setLocalStorageItem(LOCAL_STORAGE_KEYS.tournaments, payload.tournamentData);
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default saveTournamentsListener;
