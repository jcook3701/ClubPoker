import Timezone from "../types/Timezone";

/*  OAuth / Chrome extension constants */
export const CLIENT_ID =
  "643848225094-6vo6fa1grd1he703fl6cmcha71l53m81.apps.googleusercontent.com";
export const SCOPES = ["https://www.googleapis.com/auth/calendar"];

/* */
export const TOKEN_KEY = "gcal_token";
export const TIMEZONE = "timezone";
export const FILTERS = "filters";
export const SETTINGS = "settings";
export const WPTSETTINGS = "wptSettings";

/* Sync Storage Keys */
export const STORAGE_KEYS = {
  token: TOKEN_KEY,
  timezone: TIMEZONE,
  filters: FILTERS,
  settings: SETTINGS,
  wptSettings: WPTSETTINGS,
};

/* */
export const TOURNAMENTS = "tournaments";

/* Local Storage Keys */
export const LOCAL_STORAGE_KEYS = {
  tournaments: TOURNAMENTS,
};

/* App info */
export const EXTENSION_ID = "bnnhlonpnkdahlgdihflafccalglcgej";
export const REDIRECT_URI = `https://${EXTENSION_ID}.chromiumapp.org/oauth2`;

/* lobby.clubwpt.com default timezone */
export const DEFAULT_TIMEZONE: Timezone = {
  value: "America/New_York",
  label: "America/New York",
};
