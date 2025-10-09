import { MessageTypes } from "../../../constants/messages";
import {
  DomColItem,
  DomRowItem,
  DomTournamentGrid,
} from "../../../constants/tournaments";
import { sendMessage } from "../../../services/messageService";
import { Timezone, Tournament, Tournaments } from "@types";
import { getSelectorModeFromDom } from "../../../utils/scrapers/getTournamentData";
import getViewMode from "../../../utils/scrapers/getViewMode";
import {
  convertFromTzAbbrToUser,
  convertTournamentTimes,
  formatTournamentTime,
} from "../../../utils/time/timeHelpers";

/*
 * Updates rows/cols when lobby.clubwpt.com is in row mode
 */
const rowModifier = (rows: Element[], tournaments: Tournament[]): void => {
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll(DomRowItem));
    const tournament = tournaments.find(
      (t) => t.id === cols[5]?.textContent?.trim()
    );
    if (tournament) {
      cols[1].textContent = formatTournamentTime(tournament.start); // update start time
    }
  });
};

/*
 * Updates cols/rows when lobby.clubwpt.com is in col mode
 */
const colModifier = (cols: Element[], tournaments: Tournament[]): void => {
  cols.forEach((col) => {
    const row = Array.from(col.querySelectorAll(DomColItem));
    const tournament = tournaments.find(
      (t) => t.id === row[4]?.textContent?.trim()
    );
    if (tournament) {
      row[0].textContent = formatTournamentTime(tournament.start); // update start time
    }
  });
};

/*
 * Updates start times within lobby.clubwpt.com tournaments-grid
 */
const updateTournamentStartTimes = (tournamentData: Tournaments): void => {
  const viewMode = getViewMode();
  const selector = getSelectorModeFromDom();
  const container = document.querySelector(DomTournamentGrid);
  if (!container) return;
  const elements = Array.from(container.querySelectorAll(selector));
  viewMode.isRow
    ? rowModifier(elements, tournamentData.tournaments)
    : colModifier(elements, tournamentData.tournaments);
};

/*
 * TODO: Updates lobby.clubwpt.com OFFICIAL TIME section
 */
const updateOfficalTime = (timezone: Timezone): void => {
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

/*
 * Updates all required DOM objects on lobby.clubwpt.com and returns
 */
export const clubwptDomUpdater = async (
  tournamentData: Tournaments
): Promise<Tournaments | undefined> => {
  const saved = await sendMessage(MessageTypes.GET_TIMEZONE);
  const timezone = saved.timezone;
  if (!timezone) {
    console.warn("No stored timezone collected yet — skipping updates");
    return;
  }

  // TODO: Also handle updates even if timezone doesn't change.
  if (tournamentData.timeZone != timezone) {
    // Adjust start times for the new timezone
    const adjusted = convertTournamentTimes(tournamentData, timezone);

    // Update local storage Timezone and UTC ISO times with save.
    await sendMessage(MessageTypes.SAVE_TOURNAMENTS, {
      tournamentData: adjusted,
    });
    // Update the DOM with new times
    updateTournamentStartTimes(adjusted);

    return adjusted;
  }

  // Nothing changed, return undefined.
  return;
};
