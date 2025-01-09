import { chrome } from "chrome";

const handleScrapedTournaments = (
  message: any,
  sender: any,
  sendResponse: any
): void => {
  if (message.action === "scrapedTournaments") {
    saveTournamentsToGoogleCalendar(message.data);
  }
};

const getToken = (): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(token);
      }
    });
  });

const createEvent = (tournament: any, token: string): Promise<any> => {
  const startDateTime = new Date(tournament.start).toISOString();
  const endDateTime = new Date(
    new Date(tournament.start).getTime() + 60 * 60 * 1000
  ).toISOString();

  const event = {
    summary: tournament.name,
    description: `${tournament.game} - ${tournament.buyin}`,
    start: {
      dateTime: startDateTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "America/Los_Angeles",
    },
  };

  return fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  ).then((response) => response.json());
};

const saveTournamentsToGoogleCalendar = async (
  tournaments: any[]
): Promise<void> => {
  try {
    const token = await getToken();
    await Promise.all(
      tournaments.map((tournament) => createEvent(tournament, token))
    );
    console.log("All events created successfully.");
  } catch (error) {
    console.error("Error creating events: ", error);
  }
};

chrome.runtime.onMessage.addListener(handleScrapedTournaments);
