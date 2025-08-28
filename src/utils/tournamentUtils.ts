import TournamentData from "../types/TournamentData";

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
  console.log("ExtractTournamentData");
  const columns = row.querySelectorAll("ion-col");
  console.log("ion-col: ", columns);
  const start = columns[1]?.textContent?.trim() || "";
  const game = columns[2]?.textContent?.trim() || "";
  const buyin = columns[3]?.textContent?.trim() || "";
  const name = columns[4]?.textContent?.trim() || "";
  const id = columns[5]?.textContent?.trim() || "";
  const status = columns[6]?.textContent?.trim() || "";
  const enrolled = Number(columns[7]?.textContent?.trim() || "0");
  const startTime = convertToTimezone(start, timeZone);

  return { start: startTime, game, buyin, name, id, status, enrolled };
};

export const scrapeTournaments = (timeZone: string): TournamentData[] => {
  const rows = document.querySelectorAll(".grid-rows.row");
  const ionrows = document.getElementsByTagName("grid-poker");
  console.log("scrapeTournaments");
  console.log("document: ", document);

  console.log("scrapeTournaments rows:", rows);
  console.log("scrapeTournaments ionrows:", ionrows);
  return Array.from(rows)
    .map((row) => extractTournamentData(row, timeZone))
    .filter(
      (tournament) =>
        tournament.start &&
        tournament.game &&
        tournament.buyin &&
        tournament.name &&
        tournament.id &&
        tournament.status &&
        tournament.enrolled
    );
};
