/*!
 * mockData.ts for ClubPoker Chrome Extension
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

import {
  AppSettings,
  Tournament,
  Tournaments,
  CalendarEvent,
  CalendarEvents,
  Calendar,
  Timezone,
  ViewMode,
} from "@types";

import { ClubTypeValues, ThemeMode } from "@/constants/settings";

export const MOCK_TIMEZONE: Timezone = {
  value: "America/New_York",
  label: "America/New York",
};

/**
 * 1. Tournament Factory
 */
export const createMockTournament = (
  overrides: Partial<Tournament> = {}
): Tournament => ({
  id: "tourney-123",
  name: "Daily $500 Guaranteed",
  game: "No Limit Hold'em",
  buyin: "500 TP",
  start: new Date().toISOString(),
  status: "Registering",
  enrolled: 42,
  ...overrides,
});

/**
 * 2. Tournaments (State Object) Factory
 */
export const createMockTournaments = (count = 3): Tournaments => ({
  timeZone: MOCK_TIMEZONE,
  tournaments: Array.from({ length: count }, (_, i) =>
    createMockTournament({ id: `id-${i}`, name: `Tournament ${i + 1}` })
  ),
  domViewMode: "list" as ViewMode,
  timestamp: new Date(),
});

/**
 * 3. Calendar Factory
 */
export const MOCK_CALENDAR: Calendar = {
  id: "primary",
  summary: "Tournament Schedule",
};

/**
 * 4. Calendar Event Factory
 */
export const createMockCalendarEvent = (
  overrides: Partial<CalendarEvent> = {}
): CalendarEvent => ({
  id: "evt-456",
  summary: "WPT 10k Guaranteed",
  description: "No Limit Hold'em - 500 TP",
  start: {
    dateTime: new Date().toISOString(),
    timeZone: MOCK_TIMEZONE.value,
  },
  end: {
    dateTime: new Date(Date.now() + 3600000).toISOString(), // +1 hour
    timeZone: MOCK_TIMEZONE.value,
  },
  reminders: {
    useDefault: false,
    overrides: [{ method: "popup", minutes: 10 }],
  },
  ...overrides,
});

/**
 * 5. Calendar Events (Batch) Factory
 */
export const createMockCalendarEvents = (count = 3): CalendarEvents => ({
  calendar: MOCK_CALENDAR,
  calendarEvents: Array.from({ length: count }, (_, i) =>
    createMockCalendarEvent({ summary: `Event ${i + 1}` })
  ),
  timestamp: new Date(),
});

/**
 * 6. App Settings Factory
 */
export const createMockSettings = (
  overrides: Partial<AppSettings> = {}
): AppSettings => {
  // We move the array access INSIDE the function.
  // This means Vite doesn't have to resolve this value until the story actually runs.
  const defaultClub =
    ClubTypeValues && ClubTypeValues.length > 0
      ? ClubTypeValues[0]
      : { value: "Club_WPT", label: "Club WPT" };

  return {
    theme: ThemeMode.darkMode,
    club: defaultClub,
    ...overrides,
  };
};
