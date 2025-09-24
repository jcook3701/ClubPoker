import observeTournamentData from "../utils/observers/observeTournamentData";
import { registerContentListeners } from "../listeners";
import { sendMessage } from "../services/messageService";
import { MessageTypes } from "../constants/messages";
import { clubwptDomUpdater } from "./dom/TournamentsDataUpdater/TournamentDataUpdater";
import { getLocalStorageItem } from "../services/storageService";
import { LOCAL_STORAGE_KEYS } from "../config/chrome";

console.log("lobby.clubwpt.com Content Script Started:");

sendMessage(MessageTypes.PAGE_RELOADED, undefined);

observeTournamentData((data) => {
  getLocalStorageItem(LOCAL_STORAGE_KEYS.tournaments)
    .then((tournaments) => {
      tournaments ??
        sendMessage(MessageTypes.SAVE_TOURNAMENTS, { tournamentData: data });
    })
    .then(() => {
      /* console.log("Tournaments loaded:", data); */
      clubwptDomUpdater(data);
    });
});

registerContentListeners();
