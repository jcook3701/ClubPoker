import { LOCAL_STORAGE_KEYS, STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { clubwptDomUpdater } from "../content/dom/TournamentsDataUpdater/TournamentDataUpdater";
import { onMessage } from "../services/messageService";
import {
  getLocalStorageItem,
  setSyncStorageItem,
} from "../services/storageService";
import Timezone from "../types/Timezone";
import { Tournaments } from "../types/tournament";

/*
 *
 */
const saveTimezoneListener = (): void => {
  const messageType = MessageTypes.SAVE_TIMEZONE;

  onMessage(messageType, (payload) => {
    const newTimezone: Timezone | null = payload.timeZone;

    if (!newTimezone) {
      console.warn("No timezone set — skipping updates");
      return;
    }

    setSyncStorageItem(STORAGE_KEYS.timezone, newTimezone);

    getLocalStorageItem<Tournaments>(LOCAL_STORAGE_KEYS.tournaments).then(
      (tournaments) => {
        if (!tournaments) {
          console.warn("No tournaments collected yet — skipping updates");
          return;
        }

        clubwptDomUpdater(tournaments);

        const response: ResponseMap[typeof messageType] = {
          success: true,
          timezone: newTimezone,
        };
        return response;
      }
    );
  });
};

export default saveTimezoneListener;
