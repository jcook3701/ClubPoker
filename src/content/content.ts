const convertToTimezone = (dateTime: string, timeZone: string): string => {
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
};

const extractTournamentData = (row: Element, timeZone: string): any => {
  const columns = row.querySelectorAll('ion-col');
  const start = columns[1]?.textContent?.trim() || '';
  const game = columns[2]?.textContent?.trim() || '';
  const buyin = columns[3]?.textContent?.trim() || '';
  const name = columns[4]?.textContent?.trim() || '';
  const startTime = convertToTimezone(start, timeZone);

  return { start: startTime, game, buyin, name };
};

const scrapeTournaments = (timeZone: string): any[] => 
  Array.from(document.querySelectorAll('.grid-rows.row'))
    .map((row) => extractTournamentData(row, timeZone))
    .filter((tournament) => tournament.start && tournament.game && tournament.buyin && tournament.name);

// Send scraped data to background script
chrome.runtime.sendMessage({ action: 'scrapedTournaments', data: scrapeTournaments('America/New_York') });
