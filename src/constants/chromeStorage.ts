/*!
 * chromeStorage.ts for ClubPoker Chrome Extension
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

import { LOCAL_STORAGE_KEYS, SYNC_STORAGE_KEYS } from "../config/chrome";
import { MessageTypes } from "@/constants/messages";

/*
 * map message warnings to keys in a chrome config object
 */
export const StorageMap = {
  /* event messages */
  [MessageTypes.TIMEZONE_CHANGE]: LOCAL_STORAGE_KEYS.tournaments,
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: SYNC_STORAGE_KEYS.calendar,
  [MessageTypes.GET_FILTERS]: SYNC_STORAGE_KEYS.filters,
  [MessageTypes.GET_SETTINGS]: SYNC_STORAGE_KEYS.settings,
  [MessageTypes.GET_TIMEZONE]: SYNC_STORAGE_KEYS.timezone,
  [MessageTypes.SAVE_CALENDAR]: SYNC_STORAGE_KEYS.calendar,
  [MessageTypes.SAVE_FILTERS]: SYNC_STORAGE_KEYS.filters,
  [MessageTypes.SAVE_SETTINGS]: SYNC_STORAGE_KEYS.settings,
  [MessageTypes.SAVE_TIMEZONE]: SYNC_STORAGE_KEYS.timezone,
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: LOCAL_STORAGE_KEYS.calendarEvents,
  [MessageTypes.GET_TOURNAMENTS]: LOCAL_STORAGE_KEYS.tournaments,
  [MessageTypes.SAVE_CALENDAR_EVENTS]: LOCAL_STORAGE_KEYS.calendarEvents,
  [MessageTypes.SAVE_TOURNAMENTS]: LOCAL_STORAGE_KEYS.tournaments,
} as const;
