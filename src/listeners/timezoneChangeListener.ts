import { MessageTypes } from "../constants/messages";
import {
  updateOfficalTime,
  updateTournamentStartTimes,
} from "../content/dom/TournamentsGridUpdater/TournamentDataUpdater";
import { onMessage } from "../services/messageService";
import Timezone from "../types/Timezone";
import TournamentData from "../types/TournamentData";
import getTournamentsData from "../utils/scrapers/getTournamentData";
import { convertToTimeZone } from "../utils/time/timeZoneHelpers";

const timezoneChangeListener = (): void => {
  onMessage(MessageTypes.TIMEZONE_UPDATED, (payload) => {
    const newTimezone: Timezone | null = payload.timeZone;

    if (!newTimezone) {
      console.warn("No timezone set — skipping updates");
      return;
    }

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
  });
};

export default timezoneChangeListener;
