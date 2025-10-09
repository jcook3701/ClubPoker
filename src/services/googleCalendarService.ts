import {
  CalendarEvent,
  CalendarEvents,
  Timezone,
  Tournament,
  Tournaments,
} from "@types";

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
    reminders: {
      // TODO: Maybe make this something the user can set.
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 10 }, // notification 10 min before
      ],
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

const googleCalendarService = {
  tournamentToCalendarEvent,
  tournamentsToCalendarEvents,
};

export default googleCalendarService;
