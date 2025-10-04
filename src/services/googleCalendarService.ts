import { CalendarEvent, CalendarEvents } from "../types/calendar";
import Timezone from "../types/Timezone";
import { Tournament, Tournaments } from "../types/tournament";

/*
 * Create a Google Calendar event object from lobby.clubwpt.com
 * tournament object.
 *
 * @param tournament
 * @param timeZone
 * @returns CalendarEvent
 */
export const tournamentToCalendarEvent = (
  tournament: Tournament,
  timeZone: Timezone
): CalendarEvent => {
  const startDateTime = new Date(tournament.start);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event: CalendarEvent = {
    summary: tournament.name,
    description: `${tournament.game} - ${tournament.buyin}`,
    start: {
      dateTime: tournament.start,
      timeZone: timeZone.value,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: timeZone.value,
    },
  };

  return event;
};

/*
 * Converts tournaments object into calendarEvents object.
 * @param tournaments
 * @returns CalendarEvents
 */
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
