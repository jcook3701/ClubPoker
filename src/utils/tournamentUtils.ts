import TournamentData from "../types/TournamentData";

export const extractTournamentData = (row: Element): TournamentData => {
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
  const startTime = start;

  return { start: startTime, game, buyin, name, id, status, enrolled };
};

export const scrapeTournaments = (): TournamentData[] => {
  const rows = document.querySelectorAll(".grid-rows.row");
  const ionrows = document.getElementsByTagName("grid-poker");
  console.log("scrapeTournaments");
  console.log("document: ", document);

  console.log("scrapeTournaments rows:", rows);
  console.log("scrapeTournaments ionrows:", ionrows);
  return Array.from(rows)
    .map((row) => extractTournamentData(row))
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
