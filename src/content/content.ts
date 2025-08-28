import TournamentData from "../types/TournamentData";
import getTournamentsData from "../utils/scrapers/getTournamentData";

console.log("ClubWPT Content Script Started");

const observeTournaments = (
  callback: (data: TournamentData[]) => void
): void => {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(() => {
    const tournaments = getTournamentsData();
    if (tournaments.length > 0) {
      callback(tournaments);
      observer.disconnect(); // stop once data is collected
    }
  });

  observer.observe(targetNode, config);
};

// Usage in content script
observeTournaments((data) => {
  console.log("Tournaments loaded:", data);
  // You can send data to background script or process here
});
