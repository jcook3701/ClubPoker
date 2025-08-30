import TournamentData from "../types/TournamentData";

interface Message {
  action: string;
  data: TournamentData[];
}

// Handle incoming messages for tournament data
const handleScrapedTournaments = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
): void => {
  if (message.action === "scrapedTournaments") {
    saveTournamentsToGoogleCalendar(message.data);
  }
};

// Get OAuth token for Google API
const getToken = (): Promise<string> =>
  new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        reject(chrome.runtime.lastError?.message || "No token available");
      } else {
        resolve(token);
      }
    });
  });

// Create a Google Calendar event from tournament data
const createEvent = (
  tournament: TournamentData,
  token: string
): Promise<void> => {
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

// Save all tournaments to Google Calendar
const saveTournamentsToGoogleCalendar = async (
  tournaments: TournamentData[]
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
