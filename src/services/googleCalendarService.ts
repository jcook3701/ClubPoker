import { CalendarEvent } from "../types/calendar";
import Timezone from "../types/Timezone";
import { Tournament } from "../types/tournament";

/*
 * Create a Google Calendar event object from lobby.clubwpt.com tournament data.
 */
export const tournamentToCalendarEvent = (
  tournament: Tournament,
  timeZone: Timezone
): CalendarEvent => {
  const startDateTime = new Date(tournament.start).toISOString();
  const endDateTime = new Date(
    new Date(tournament.start).getTime() + 60 * 60 * 1000
  ).toISOString();

  const event: CalendarEvent = {
    summary: tournament.name,
    description: `${tournament.game} - ${tournament.buyin}`,
    start: {
      dateTime: startDateTime,
      timeZone: timeZone.value,
    },
    end: {
      dateTime: endDateTime,
      timeZone: timeZone.value,
    },
  };

  return event;
};
