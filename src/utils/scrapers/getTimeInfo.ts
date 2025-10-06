/*
 * Gets Offical time from lobby.clubwpt.com dom
 */
const getTimeInfo = (): { time: string; tzAbbr: string } | null => {
  const header = document.querySelector(
    "ion-header.time-header p span.heading span:last-child"
  );
  if (!header) return null;

  const [timeStr, tzAbbr] = header.textContent?.trim().split(" ") ?? [];
  return timeStr && tzAbbr ? { time: timeStr, tzAbbr } : null;
};

export default getTimeInfo;
