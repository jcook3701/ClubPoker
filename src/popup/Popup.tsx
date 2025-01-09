import React, { useState } from "react";
import ReactDOM from "react-dom";
import { extractTournamentData } from "../utils/tournamentUtils";
import "./popup.scss";

const timezones = [
  "America/Los_Angeles",
  "America/Chicago",
  "America/New_York",
  "UTC",
];

const scrapeTournaments = (timezone: string): void => {
  const tournaments = Array.from(document.querySelectorAll(".grid-rows.row"))
    .map((row) => extractTournamentData(row, timezone))
    .filter(
      (tournament) =>
        tournament.start &&
        tournament.game &&
        tournament.buyin &&
        tournament.name
    );

  chrome.runtime.sendMessage({
    action: "scrapedTournaments",
    data: tournaments,
  });
};

const Popup: React.FC = () => {
  const [timezone, setTimezone] = useState("America/New_York");

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTimezone(event.target.value);
  };

  const handleClick = (): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: scrapeTournaments,
          args: [timezone],
        });
      }
    });
  };

  return (
    <div className="popup">
      <select value={timezone} onChange={handleTimezoneChange}>
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Scrape Tournaments</button>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
