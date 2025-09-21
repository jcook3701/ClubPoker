import { DEFAULT_TIMEZONE, LOCAL_STORAGE_KEYS } from "../../config/chrome";
import { getLocalStorageItem } from "../../services/storageService";
import { Tournaments, Tournament } from "../../types/tournament";
import getTournamentsFromDom from "../scrapers/getTournamentData";

const waitForTournamentGrid = (callback: (grid: Element) => void): void => {
  const container = document.querySelector("tournaments-grid");
  if (container) {
    callback(container);
    return;
  }

  const tempObserver = new MutationObserver(() => {
    const container = document.querySelector("tournaments-grid");
    if (container) {
      callback(container);
      tempObserver.disconnect(); // stop watching <body>
    }
  });

  tempObserver.observe(document.body, { childList: true, subtree: true });
};

/*
 *
 */
const observeTournamentData = (callback: (data: Tournaments) => void): void => {
  waitForTournamentGrid((container) => {
    const run = (): void => {
      getLocalStorageItem<Tournaments>(LOCAL_STORAGE_KEYS.tournaments).then(
        (storageTournaments) => {
          const domTournaments: Tournament[] = getTournamentsFromDom();
          const timezone = storageTournaments
            ? storageTournaments?.timeZone
            : DEFAULT_TIMEZONE;

          const tournamentsData: Tournaments = {
            timeZone: timezone,
            tournaments: domTournaments,
          };

          if (tournamentsData.tournaments.length > 0) {
            callback(tournamentsData);
          }
        }
      );
    };

    run();

    const observer = new MutationObserver(run);
    observer.observe(container, { childList: true, subtree: true });
  });
};

export default observeTournamentData;
