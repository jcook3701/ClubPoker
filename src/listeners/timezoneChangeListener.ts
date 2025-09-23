import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { clubwptDomUpdater } from "../content/dom/TournamentsDataUpdater/TournamentDataUpdater";
import { onMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { Tournaments } from "../types/tournament";

/*
 * Handles DOM updates when timezone is modified within chrome.sync storage.
 */
const timezoneChangeListener = (): void => {
  const messageType = MessageTypes.TIMEZONE_CHANGE;
  onMessage(messageType, () => {
    getLocalStorageItem<Tournaments>(LOCAL_STORAGE_KEYS.tournaments).then(
      (tournaments) => {
        if (!tournaments) {
          console.warn("No tournaments collected yet — skipping updates");
          return;
        }

        clubwptDomUpdater(tournaments);

        const response: ResponseMap[typeof messageType] = {
          success: true,
        };
        return response;
      }
    );
  });
};

export default timezoneChangeListener;
