import TournamentData from "../../types/TournamentData";
import getViewMode from "./getViewMode";

const rowExport = (rows: Element[]): TournamentData[] => {
  return rows
    .map((row) => {
      const cols = Array.from(row.querySelectorAll("ion-col.col"));
      if (cols.length < 8) return null; // skip invalid cols

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
    .map((col) => {
      const row = Array.from(col.querySelectorAll("span.tiles-text"));
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

export const getSelectorMode = (): string => {
  const viewMode = getViewMode();
  const rowView = "ion-row.grid-rows.row";
  const colView = "ion-col.nested-col.col";
  return viewMode.isRow ? rowView : colView;
};

const getTournamentsData = (): TournamentData[] => {
  const viewMode = getViewMode();
  const selector = getSelectorMode();
  const container = document.querySelector("tournaments-grid");
  const data = container
    ? Array.from(container.querySelectorAll(selector))
    : [];

  return viewMode.isRow ? rowExport(data) : colExport(data);
};

export default getTournamentsData;
