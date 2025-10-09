import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { clubwptDomUpdater } from "../content/dom/TournamentsDataUpdater/TournamentDataUpdater";
import { onMessage, sendMessage } from "../services/messageService";
import { getLocalStorageItem } from "../services/storageService";
import { Tournaments } from "@types";
import { createWarning } from "../utils/messages/warnings";

/*
 * Handles DOM updates when timezone is modified within chrome.sync storage.
 */
const timezoneChangeListener = (): void => {
  const messageType = MessageTypes.TIMEZONE_CHANGE;
  const warningCode = WarningCodeMap.TIMEZONE_CHANGE;
  const storageKey = StorageMap.TIMEZONE_CHANGE;
  onMessage(messageType, async () => {
    const tournaments = await getLocalStorageItem<Tournaments>(storageKey);
    if (!tournaments) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
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
