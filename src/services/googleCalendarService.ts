import { CalendarEvent, CalendarEvents } from "../types/calendar";
import Timezone from "../types/Timezone";
import { Tournament, Tournaments } from "../types/tournament";
import { parseTournamentTime } from "../utils/time/timeHelpers";

/*
 * Create a Google Calendar event object from lobby.clubwpt.com tournament data.
 */
export const tournamentToCalendarEvent = (
  tournament: Tournament,
  timeZone: Timezone
): CalendarEvent => {
  const startDateTime = parseTournamentTime(tournament.start);
  const currentYear = new Date().getFullYear();
  startDateTime.setFullYear(currentYear);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event: CalendarEvent = {
    summary: tournament.name,
    description: `${tournament.game} - ${tournament.buyin}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: timeZone.value,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: timeZone.value,
    },
  };

  return event;
};

export const tournamentsToCalendarEvents = (
  tournaments: Tournaments
): CalendarEvents => {
  const calendarEvents: CalendarEvents = {
    calendarEvents: tournaments.tournaments.map((tournament) => {
      return tournamentToCalendarEvent(tournament, tournaments.timeZone);
    }),
    timestamp: tournaments.timestamp,
  };
  return calendarEvents;
};
