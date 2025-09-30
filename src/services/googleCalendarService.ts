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
  // const currentYear = new Date().getFullYear();

  const startDateTime = new Date(tournament.start);
  // startDateTime.setFullYear(currentYear);
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
