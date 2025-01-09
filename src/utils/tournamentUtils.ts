import TournamentData from "../types/tournament";

export const convertToTimezone = (
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

export const extractTournamentData = (
  row: Element,
  timeZone: string
): TournamentData => {
  const columns = row.querySelectorAll("ion-col");
  const start = columns[1]?.textContent?.trim() || "";
  const game = columns[2]?.textContent?.trim() || "";
  const buyin = columns[3]?.textContent?.trim() || "";
  const name = columns[4]?.textContent?.trim() || "";
  const startTime = convertToTimezone(start, timeZone);

  return { start: startTime, game, buyin, name };
};
