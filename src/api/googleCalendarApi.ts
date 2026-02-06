/*!
 * googleCalendarApi.toml for ClubPoker Chrome Extension
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

import { Calendar, CalendarEvent } from "@types";
import { SYNC_STORAGE_KEYS } from "@/config/chrome";

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
  const data: CalendarEvent = await res.json();
  return data;
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

const googleCalendarApi = {
  getRedirectUri,
  getToken,
  createEvent,
  listCalendars,
  fetchCalendarEvents,
};

export default googleCalendarApi;
