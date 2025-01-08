import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.scss';

const timezones = [
  'America/Los_Angeles',
  'America/Chicago',
  'America/New_York',
  'UTC',
];

const scrapeTournaments = (timezone: string): void => {
  function convertToTimezone(dateTime: string, timeZone: string): string {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  }

  function extractTournamentData(row: Element, timeZone: string): any {
    const columns = row.querySelectorAll('ion-col');
    const start = columns[1]?.textContent?.trim() || '';
    const game = columns[2]?.textContent?.trim() || '';
    const buyin = columns[3]?.textContent?.trim() || '';
    const name = columns[4]?.textContent?.trim() || '';
    const startTime = convertToTimezone(start, timeZone);

    return { start: startTime, game, buyin, name };
  }

  const tournaments = Array.from(document.querySelectorAll('.grid-rows.row'))
    .map((row) => extractTournamentData(row, timezone))
    .filter((tournament) => tournament.start && tournament.game && tournament.buyin && tournament.name);

  chrome.runtime.sendMessage({ action: 'scrapedTournaments', data: tournaments });
};

const Popup: React.FC = () => {
  const [timezone, setTimezone] = useState('America/New_York');

  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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

ReactDOM.render(<Popup />, document.getElementById('root'));
