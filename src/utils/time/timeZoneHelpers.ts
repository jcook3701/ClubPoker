import TournamentData from "../../types/TournamentData";

export const convertToTimeZone = (
  dateTime: string,
  timeZone: string
): string => {
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export const convertTournamentTimes = (
  tournaments: TournamentData[],
  timeZone: string
): TournamentData[] =>
  tournaments.map((t) => ({
    ...t,
    start: convertToTimeZone(t.start, timeZone),
  }));
