import tournamentDataListener from "../listeners/tournamentDataListener";
import timezoneChangeListener from "../listeners/timezoneChangeListener";
import observeTournamentData from "../utils/observers/observeTournamentData";

console.log("ClubWPT Content Script Started");

// Usage in content script
observeTournamentData((data) => {
  console.log("Tournaments loaded:", data);
  // chrome.runtime.sendMessage({ type: "TOURNAMENT_DATA", payload: data });
});

console.log("hello world -----------------------------------------");

tournamentDataListener();
timezoneChangeListener();
