import { Tournament } from "../../types/tournament";
import getViewMode from "./getViewMode";

/*
 * Exports tournament data when in lobby.clubwpt.com is in row mode.
 */
const rowExport = (rows: Element[]): Tournament[] => {
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
      } as Tournament;
    })
    .filter((tournament): tournament is Tournament => tournament !== null);
};

/*
 * Exports tournament data when in lobby.clubwpt.com is in col mode.
 */
const colExport = (cols: Element[]): Tournament[] => {
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
      } as Tournament;
    })
    .filter((tournament): tournament is Tournament => tournament !== null);
};

/*
 * Collects current selector mode from the loby.clubwpt.com dom.
 */
export const getSelectorModeFromDom = (): string => {
  const viewMode = getViewMode();
  const rowView = "ion-row.grid-rows.row";
  const colView = "ion-col.nested-col.col";
  return viewMode.isRow ? rowView : colView;
};

/*
 * Collects tournament data from the loby.clubwpt.com dom.
 */
const getTournamentsFromDom = (): Tournament[] => {
  const viewMode = getViewMode();
  const selector = getSelectorModeFromDom();
  const container = document.querySelector("tournaments-grid");
  const data = container
    ? Array.from(container.querySelectorAll(selector))
    : [];

  return viewMode.isRow ? rowExport(data) : colExport(data);
};

export default getTournamentsFromDom;
