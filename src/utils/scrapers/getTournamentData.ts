import TournamentData from "../../types/TournamentData";
import getViewMode from "./getViewMode";

const rowExport = (rows: Element[]): TournamentData[] => {
  return rows
    .map((row) => {
      const cols = Array.from(row.querySelectorAll("ion-col.col"));
      if (cols.length < 8) return null; // skip invalid rows

      return {
        start: cols[1].textContent?.trim() || "",
        game: cols[2].textContent?.trim() || "",
        buyin: cols[3].textContent?.trim() || "",
        name: cols[4].textContent?.trim() || "",
        id: cols[5].textContent?.trim() || "",
        status: cols[6].textContent?.trim() || "",
        enrolled: Number(cols[7].textContent?.trim() || "0"),
      } as TournamentData;
    })
    .filter((tournament): tournament is TournamentData => tournament !== null);
};

const colExport = (cols: Element[]): TournamentData[] => {
  return cols
    .map((cols) => {
      const row = Array.from(cols.querySelectorAll("span.tiles-text"));
      if (row.length < 7) return null; // skip invalid rows

      return {
        start: row[0].textContent?.trim() || "",
        game: row[1].textContent?.trim() || "",
        buyin: row[2].textContent?.trim() || "",
        name: row[3].textContent?.trim() || "",
        id: row[4].textContent?.trim() || "",
        status: row[5].textContent?.trim() || "",
        enrolled: Number(row[6].textContent?.trim() || "0"),
      } as TournamentData;
    })
    .filter((tournament): tournament is TournamentData => tournament !== null);
};

const getTournamentsData = (): TournamentData[] => {
  const viewMode = getViewMode();
  const rowSelector = viewMode.isRow
    ? "ion-row.grid-rows.row"
    : "ion-col.nested-col.col"; // adjust column selector if in column mode
  const container = document.querySelector("tournaments-grid");
  const rows = container
    ? Array.from(container.querySelectorAll(rowSelector))
    : [];

  return viewMode.isRow ? rowExport(rows) : colExport(rows);
};

export default getTournamentsData;
