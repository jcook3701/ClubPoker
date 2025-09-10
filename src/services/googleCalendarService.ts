import { CalendarEvent } from "../types/calendar";
import TournamentData from "../types/TournamentData";

// Create a Google Calendar event from tournament data
const tournamentToCalendarEvent = (
  tournament: TournamentData
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
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "America/Los_Angeles",
    },
  };

  return event;
};
