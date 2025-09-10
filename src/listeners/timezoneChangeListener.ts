import {
  updateOfficalTime,
  updateTournamentStartTimes,
} from "../content/dom/TournamentsGridUpdater/TournamentDataUpdater";
import Timezone from "../types/Timezone";
import TournamentData from "../types/TournamentData";
import getTournamentsData from "../utils/scrapers/getTournamentData";
import { convertToTimeZone } from "../utils/time/timeZoneHelpers";

const timezoneChangeListener = (): void => {
  console.log("started timezone listener ----------------------------");
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TIMEZONE_UPDATED") {
      const newTimezone: Timezone = message.payload;

      // Re-fetch tournaments from the page
      const tournaments: TournamentData[] = getTournamentsData();

      // Adjust start times for the new timezone
      const adjusted = tournaments.map((t) => ({
        ...t,
        start: convertToTimeZone(t.start, newTimezone),
      }));

      // Update the DOM with new times
      updateTournamentStartTimes(adjusted);
      updateOfficalTime(newTimezone);

      sendResponse({ status: "ok" });
    }
  });
};

export default timezoneChangeListener;
