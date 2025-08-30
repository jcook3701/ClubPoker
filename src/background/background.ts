import tournamentDataListener from "../listeners/tournamentDataListener";

chrome.runtime.onMessage.addListener(tournamentDataListener);

// chrome.runtime.onMessage.addListener(handleScrapedTournaments);
