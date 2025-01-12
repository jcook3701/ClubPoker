import { scrapeTournaments } from "../utils/tournamentUtils";

console.log("Content");

document.addEventListener("DOMContentLoaded", function () {
  const tournaments = scrapeTournaments("America/New_York");
  console.log("tournamentsData: ", tournaments);
});

/*  
  // Send scraped data to background script
  chrome.runtime.sendMessage({
    action: "scrapedTournaments",
    data: scrapeTournaments("America/New_York"),
  });
*/
