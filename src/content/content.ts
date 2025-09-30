import observeTournamentData from "../utils/observers/observeTournamentData";
import { registerContentListeners } from "../listeners";
import { sendMessage } from "../services/messageService";
import { MessageTypes } from "../constants/messages";
import { clubwptDomUpdater } from "./dom/TournamentsDataUpdater/TournamentDataUpdater";
import { tournamentToCalendarEvent } from "../services/googleCalendarService";
import { applyTournamentFilters } from "../utils/filter/filterHelpers";

console.log("lobby.clubwpt.com Content Script Started:");

sendMessage(MessageTypes.PAGE_RELOADED, undefined);

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

    const filteredTournaments = applyTournamentFilters(adjusted, filtersState);

    console.log(
      "FilteredTournaments: ",
      filteredTournaments,
      " filtersState: ",
      filtersState
    );
    const calendarEvents = filteredTournaments.tournaments.map((tournament) =>
      tournamentToCalendarEvent(tournament, adjusted.timeZone)
    );

    // TODO: Check if Calendar has been set and add that to calendarData.

    await sendMessage(MessageTypes.SAVE_CALENDAR_EVENTS, {
      calendarData: { calendarEvents: calendarEvents },
    });

    // TODO: Save both filtered tournaments and calendar events
  }
});

registerContentListeners();
