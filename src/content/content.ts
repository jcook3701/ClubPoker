import observeTournamentData from "../utils/observers/observeTournamentData";

console.log("ClubWPT Content Script Started");

// Usage in content script
observeTournamentData((data) => {
  console.log("Tournaments loaded:", data);
  // You can send data to background script or process here
});
