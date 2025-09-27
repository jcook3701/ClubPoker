import { LOCAL_STORAGE_KEYS } from "../config/chrome";
import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { clubwptDomUpdater } from "../content/dom/TournamentsDataUpdater/TournamentDataUpdater";
import { onMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { Tournaments } from "../types/tournament";

/*
 * Handles DOM updates when timezone is modified within chrome.sync storage.
 */
const timezoneChangeListener = (): void => {
  const messageType = MessageTypes.TIMEZONE_CHANGE;
  const warningCode = WarningCodeMap;
  onMessage(messageType, async () => {
    const tournaments = await getLocalStorageItem<Tournaments>(
      LOCAL_STORAGE_KEYS.tournaments
    );
    if (!tournaments) {
      console.warn("No tournaments collected yet — skipping updates");
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      clubwptDomUpdater(tournaments);

      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default timezoneChangeListener;
