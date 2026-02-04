/*!
 * chrome.ts for ClubPoker Chrome Extension
 *
 * SPDX-FileCopyrightText: Copyright (c) 2025-2026, Jared Cook
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <www.gnu.org>.
 */

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
  calendar: CALENDAR,
  filters: FILTERS,
  settings: SETTINGS,
  wptSettings: WPTSETTINGS,
} as const;

export type SyncStorageKeys =
  (typeof SYNC_STORAGE_KEYS)[keyof typeof SYNC_STORAGE_KEYS];

/*
 * Individual local storage keys
 */
const TOURNAMENTS = "tournaments";
const CALENDAR_EVENTS = "calendar_events";

/* Local Storage Keys */
export const LOCAL_STORAGE_KEYS = {
  tournaments: TOURNAMENTS,
  calendarEvents: CALENDAR_EVENTS,
} as const;

export type LOCAL_STORAGE_KEYS =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

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
export const HELP_PAGE_URI =
  "https://github.com/jcook3701/club-wpt-chrome-extension";
export const CLUB_WPT_URL = "https://lobby.clubwpt.com/";

/*
 * OAuth / Chrome extension constants
 */
export const CLIENT_ID =
  "643848225094-6vo6fa1grd1he703fl6cmcha71l53m81.apps.googleusercontent.com";
export const SCOPES = ["https://www.googleapis.com/auth/calendar"];
