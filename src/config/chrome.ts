import Timezone from "../types/Timezone";

/*
 * Individual sync storage keys
 */
const TOKEN = "gcal_token";
const TIMEZONE = "timezone";
const CALENDAR = "calendar";
const FILTERS = "filters";
const SETTINGS = "settings";
const WPTSETTINGS = "wptSettings";

/*
 * Sync Storage Keys
 */
export const SYNC_STORAGE_KEYS = {
  token: TOKEN,
  timezone: TIMEZONE,
  calender: CALENDAR,
  filters: FILTERS,
  settings: SETTINGS,
  wptSettings: WPTSETTINGS,
};

/*
 * Individual local storage keys
 */
const TOURNAMENTS = "tournaments";
const CALENDAR_EVENTS = "calendar_events";

/* Local Storage Keys */
export const LOCAL_STORAGE_KEYS = {
  tournaments: TOURNAMENTS,
  calendarEvents: CALENDAR_EVENTS,
};

/*
 * Individual Filter keys
 */
const GAME_FILTER = "game_filter";
const BUY_IN_FILTER = "buy_in_filter";

/*
 * Filter Keys
 */
export const FILTER_KEYS = {
  gameFilter: GAME_FILTER,
  buyInFilter: BUY_IN_FILTER,
};

/*
 * App info
 */
export const EXTENSION_ID = "bnnhlonpnkdahlgdihflafccalglcgej";
export const REDIRECT_URI = `https://${EXTENSION_ID}.chromiumapp.org/oauth2`;

/*
 * OAuth / Chrome extension constants
 */
export const CLIENT_ID =
  "643848225094-6vo6fa1grd1he703fl6cmcha71l53m81.apps.googleusercontent.com";
export const SCOPES = ["https://www.googleapis.com/auth/calendar"];
