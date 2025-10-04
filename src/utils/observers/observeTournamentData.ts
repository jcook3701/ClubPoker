import { LOCAL_STORAGE_KEYS } from "../../config/chrome";
import { DEFAULT_TIMEZONE } from "../../constants/timezone";
import { getLocalStorageItem } from "../../services/storageService";
import { Tournaments, Tournament } from "../../types/tournament";
import getTournamentsFromDom from "../scrapers/getTournamentData";

/*
 * Utility: debounce function calls.
 * Ensures `fn` only executes after `delay` ms of silence.
 * Useful for preventing excessive calls from noisy observers.
 */
const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): ((...args: Args) => void) => {
  let timer: number | undefined;
  return (...args: Args) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => fn(...args), delay);
  };
};

/*
 * Waits for the <tournaments-grid> element to appear in the DOM.
 * Immediately calls `callback` if it's already present,
 * otherwise attaches a temporary MutationObserver on <body>
 * and disconnects once the grid is found.
 */
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
 * Observes tournament data inside <tournaments-grid>.
 * 1. Collects tournament info from the DOM.
 * 2. Falls back to stored timezone if available.
 * 3. Debounces observer callbacks to avoid rapid firing.
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
            timestamp: new Date(),
          };

          if (tournamentsData.tournaments.length > 0) {
            callback(tournamentsData);
          }
        }
      );
    };

    // Debounced runner
    const debouncedRun = debounce(run, 300);

    // run once immediately
    run();

    const observer = new MutationObserver(debouncedRun);
    observer.observe(container, { childList: true, subtree: true });
  });
};

export default observeTournamentData;
