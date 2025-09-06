import { Calendar, CalendarEvent } from "../types/calendar";

const CLIENT_ID =
  "643848225094-6vo6fa1grd1he703fl6cmcha71l53m81.apps.googleusercontent.com";
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
 * Returns the full redirect URI based on extension ID + "oauth2" path.
 */
export const getRedirectUri = (): string => {
  return chrome.identity.getRedirectURL("oauth2");
};
/**
 * Build the Google OAuth2 URL.
 */
export const getAuthUrl = (): string => {
  const redirectUrl = getRedirectUri();
  const query = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUrl,
    response_type: "token",
    scope: SCOPES.join(" "),
  });
  const url = `https://accounts.google.com/o/oauth2/auth?${query.toString()}`;

  console.log("===== OAuth Debug =====");
  console.log("Redirect URI: ", redirectUrl);
  console.log("Auth URL: ", url);
  console.log("Client ID: ", CLIENT_ID);
  console.log("Scopes: ", SCOPES.join(", "));
  console.log("=======================");
  return url;
};

/**
 * Launches the Google OAuth2 flow and saves the token in chrome.storage.
 */
export const authenticate = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.identity.launchWebAuthFlow(
      { url: getAuthUrl(), interactive: true },
      (redirectUrl) => {
        if (!redirectUrl) return resolve(null);

        const tokenMatch = redirectUrl.match(/access_token=([^&]+)/);
        if (tokenMatch) {
          const token = tokenMatch[1];
          chrome.storage.sync.set({ gcal_token: token }, () => resolve(token));
        } else {
          resolve(null);
        }
      }
    );
  });
};

/**
 * Retrieves stored token from chrome.storage.
 */
export const getToken = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("gcal_token", (items) => {
      resolve(items.gcal_token || null);
    });
  });
};

/**
 * Fetches the list of user calendars.
 */
export const listCalendars = async (token: string): Promise<Calendar[]> => {
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) throw new Error(`Google API error: ${res.status}`);
  const data = await res.json();
  return data.items || [];
};

/**
 * Creates an event in the selected calendar.
 */
export const createEvent = async (
  token: string,
  calendarId: string,
  event: CalendarEvent
): Promise<any> => {
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
