import { scrapeTournaments } from "../utils/tournamentUtils";

const sendTournamentData = () => {
  // Send scraped data to background script
  chrome.runtime.sendMessage({
    action: "scrapedTournaments",
    data: scrapeTournaments("America/New_York"),
  });
};
