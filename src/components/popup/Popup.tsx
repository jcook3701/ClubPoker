import React, { useEffect, useState } from "react";
import { extractTournamentData } from "../../utils/tournamentUtils";
import "./Popup.scss";

const timezones = Intl.supportedValuesOf("timeZone");

// [
//	"America/Los_Angeles",
//	"America/Chicago",
//	"America/New_York",
//	"UTC"];
//

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

const injectDataToPage = (tournaments: any[]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (data) => {
          // Example: Append tournament data to the page
          const tournamentList = document.createElement("div");
          tournamentList.style.position = "fixed";
          tournamentList.style.top = "10px";
          tournamentList.style.right = "10px";
          tournamentList.style.backgroundColor = "white";
          tournamentList.style.border = "1px solid black";
          tournamentList.style.padding = "10px";
          tournamentList.innerHTML = `<h3>Tournaments:</h3><ul>${data
            .map(
              (t) => `<li>${t.name} - ${t.time} - ${t.game} - ${t.buyin}</li>`
            )
            .join("")}</ul>`;
          document.body.appendChild(tournamentList);
        },
        args: [tournaments],
      });
    }
  });
};

const Popup: React.FC = () => {
  const [timezone, setTimezone] = useState("America/New_York");

  useEffect(() => {
    // This code will run after the component renders
    console.log("Component mounted");

    // Cleanup function (optional)
    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array means the effect runs once on mount

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTimezone(event.target.value);
  };

  const handleClick = (): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("Hello World");
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

export default Popup;
