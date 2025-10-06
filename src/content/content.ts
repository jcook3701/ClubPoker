import observeTournamentData from "../utils/observers/observeTournamentData";
import { registerContentListeners } from "../listeners";
import { sendMessage } from "../services/messageService";
import { MessageTypes } from "../constants/messages";
import { clubwptDomUpdater } from "./dom/TournamentsDataUpdater/TournamentDataUpdater";
import { tournamentsToCalendarEvents } from "../services/googleCalendarService";
import { applyTournamentFilters } from "../utils/filter/filterHelpers";

console.log("lobby.clubwpt.com Content Script Started:");
(async () => {
  try {
    await sendMessage(MessageTypes.PAGE_RELOADED);
  } catch (err) {
    console.warn("PAGE_RELOADED message failed:", err);
  }
})();

observeTournamentData(async (data) => {
  const saved = await sendMessage(MessageTypes.GET_TOURNAMENTS);
  const tournaments = saved.tournamentData;

  if (!tournaments) {
    await sendMessage(MessageTypes.SAVE_TOURNAMENTS, { tournamentData: data });
  }

  const adjusted = await clubwptDomUpdater(data);

  if (adjusted) {
    const getFiltersResponse = await sendMessage(MessageTypes.GET_FILTERS);
    const filtersState = getFiltersResponse.filters;

    // TODO: Reverse order of filtered tournaments for display purposes
    const filteredTournaments = applyTournamentFilters(adjusted, filtersState);

    const calendarEvents = tournamentsToCalendarEvents(filteredTournaments);

    await sendMessage(MessageTypes.SAVE_CALENDAR_EVENTS, {
      calendarData: calendarEvents,
    });
  }
});

registerContentListeners();
