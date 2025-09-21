import { STORAGE_KEYS } from "../../../config/chrome";
import { MessageTypes } from "../../../constants/messages";
import { sendMessage } from "../../../services/messageService";
import { getSyncStorageItem } from "../../../services/storageService";
import Timezone from "../../../types/Timezone";
import { Tournament, Tournaments } from "../../../types/tournament";
import { getSelectorModeFromDom } from "../../../utils/scrapers/getTournamentData";
import getViewMode from "../../../utils/scrapers/getViewMode";
import {
  convertFromTzAbbrToUser,
  convertTournamentTimes,
} from "../../../utils/time/timeZoneHelpers";

/*
 * Updates rows/cols when lobby.clubwpt.com is in row mode
 */
const rowModifier = (rows: Element[], tournaments: Tournament[]): void => {
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

/*
 * Updates cols/rows when lobby.clubwpt.com is in col mode
 */
const colModifier = (cols: Element[], tournaments: Tournament[]): void => {
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

/*
 * Updates start times within lobby.clubwpt.com tournaments-grid
 */
const updateTournamentStartTimes = (tournamentData: Tournaments): void => {
  const viewMode = getViewMode();
  const selector = getSelectorModeFromDom();
  const container = document.querySelector("tournaments-grid");
  if (!container) return;
  const elements = Array.from(container.querySelectorAll(selector));
  viewMode.isRow
    ? rowModifier(elements, tournamentData.tournaments)
    : colModifier(elements, tournamentData.tournaments);
};

/*
 * Updates lobby.clubwpt.com OFFICIAL TIME section
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
 * Updates all required DOM objects on lobby.clubwpt.com
 */
export const clubwptDomUpdater = (tournamentData: Tournaments): void => {
  console.log("Updating Tournaments");
  getSyncStorageItem<Timezone>(STORAGE_KEYS.timezone).then((timezone) => {
    if (!timezone) {
      console.warn("No stored timezone collected yet — skipping updates");
      return;
    }

    if (tournamentData.timeZone != timezone) {
      // Adjust start times for the new timezone
      const adjusted = convertTournamentTimes(tournamentData, timezone);

      // Update local storage with adjusted times
      sendMessage(MessageTypes.SAVE_TOURNAMENTS, {
        tournamentData: adjusted,
      }).then(() => {
        // Update the DOM with new times
        updateTournamentStartTimes(adjusted);
      });
    }
  });
};
