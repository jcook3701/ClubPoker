import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage } from "../services/messageService";
import { setLocalStorageItem } from "../services/storageService";

/*
 * Saves Tournmants object payload to chrome.local storage.
 */
const saveTournamentsListener = (): void => {
  const messageType = MessageTypes.SAVE_TOURNAMENTS;
  const warningCode = WarningCodeMap.SAVE_TOURNAMENTS;
  const storageKey = StorageMap.SAVE_TOURNAMENTS;
  onMessage(messageType, async (payload) => {
    const newTournaments = payload.tournamentData;
    await setLocalStorageItem(storageKey, newTournaments);
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default saveTournamentsListener;
