import Timezone from "../../../types/Timezone";
import TournamentData from "../../../types/TournamentData";
import { getSelectorMode } from "../../../utils/scrapers/getTournamentData";
import getViewMode from "../../../utils/scrapers/getViewMode";
import { convertFromTzAbbrToUser } from "../../../utils/time/timeZoneHelpers";

const rowModifier = (rows: Element[], tournaments: TournamentData[]): void => {
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll("ion-col.col"));
    const tournament = tournaments.find(
      (t) => t.id === cols[5]?.textContent?.trim()
    );
    if (tournament) {
      cols[1].textContent = tournament.start; // update start time
    }
  });
};

const colModifier = (cols: Element[], tournaments: TournamentData[]): void => {
  cols.forEach((col) => {
    const row = Array.from(col.querySelectorAll("span.tiles-text"));
    const tournament = tournaments.find(
      (t) => t.id === row[4]?.textContent?.trim()
    );
    if (tournament) {
      row[0].textContent = tournament.start; // update start time
    }
  });
};

export const updateTournamentStartTimes = (
  tournaments: TournamentData[]
): void => {
  const viewMode = getViewMode();
  const selector = getSelectorMode();
  const container = document.querySelector("tournaments-grid");
  if (!container) return;
  const elements = Array.from(container.querySelectorAll(selector));
  viewMode.isRow
    ? rowModifier(elements, tournaments)
    : colModifier(elements, tournaments);
};

export const updateOfficalTime = (timezone: Timezone): void => {
  const officialTimeElement = document.querySelector(
    "ion-header.time-header p span.heading span:last-child"
  ) as HTMLElement | null;

  if (officialTimeElement) {
    // extract the time and tzAbbr from text content
    const officialTime = officialTimeElement.textContent ?? "";
    if (officialTime) {
      console.log(officialTime);
      officialTimeElement.textContent = convertFromTzAbbrToUser(
        officialTime,
        timezone
      );
    }
  }
};
