import { Calendar, CalendarEvent } from "../types/calendar";
import { SYNC_STORAGE_KEYS } from "../config/chrome";

/**
 * Returns the full redirect URI based on extension ID + "oauth2" path.
 */
export const getRedirectUri = (): string => {
  return chrome.identity.getRedirectURL("oauth2");
};

/**
 * Retrieves a valid Google Calendar OAuth token for the extension.
 */
export const getToken = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error("OAuth failed:", chrome.runtime.lastError.message);
        return resolve(null);
      }

      if (!token) return resolve(null);

      // Store token for future API calls
      chrome.storage.sync.set({ [SYNC_STORAGE_KEYS.token]: token }, () =>
        resolve(token)
      );
    });
  });
};

/**
 * Creates an event in the selected calendar.
 */
export const createEvent = async (
  calendarId: string,
  event: CalendarEvent
): Promise<CalendarEvent> => {
  const token = await getToken();
  if (!token) throw new Error("No OAuth token available");

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!res.ok) throw new Error(`Google API error: ${res.status}`);
  return res.json();
};

/**
 * Fetches the list of user calendars.
 */
export const listCalendars = async (): Promise<Calendar[]> => {
  const token = await getToken();
  if (!token) throw new Error("No OAuth token available");

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) throw new Error(`Google API error: ${res.status}`);
  const data = await res.json();
  return data.items || [];
};

/**
 * Fetches events from a specific calendar.
 */
export const fetchCalendarEvents = async (
  calendarId: string
): Promise<CalendarEvent[] | null> => {
  const token = await getToken();
  if (!token) return null;

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch events:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.items as CalendarEvent[];
};
