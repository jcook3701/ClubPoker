import TournamentData from "../types/tournament";
import { extractTournamentData } from "../utils/tournamentUtils";

const scrapeTournaments = (timeZone: string): TournamentData[] =>
  Array.from(document.querySelectorAll(".grid-rows.row"))
    .map((row) => extractTournamentData(row, timeZone))
    .filter(
      (tournament) =>
        tournament.start &&
        tournament.game &&
        tournament.buyin &&
        tournament.name
    );

// Send scraped data to background script
chrome.runtime.sendMessage({
  action: "scrapedTournaments",
  data: scrapeTournaments("America/New_York"),
});
