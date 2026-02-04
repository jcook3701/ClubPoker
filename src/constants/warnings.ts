/*!
 * warnings.ts for ClubPoker Chrome Extension
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

import { WarningCode } from "@types";
import { MessageTypes } from "./messages";

/*
 * map message warnings to keys in a chrome config object
 */
export const WarningCodeMap = {
  /* event messages */
  [MessageTypes.PAGE_RELOADED]: undefined,
  [MessageTypes.SETTINGS_CHANGE]: undefined,
  [MessageTypes.TIMEZONE_CHANGE]: WarningCode.emptyLocalStorage,
  /* chrome.sync storage messages */
  [MessageTypes.GET_CALENDAR]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_FILTERS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_SETTINGS]: WarningCode.emptySyncStorage,
  [MessageTypes.GET_TIMEZONE]: WarningCode.emptySyncStorage,
  [MessageTypes.SAVE_CALENDAR]: WarningCode.missingPayload,
  [MessageTypes.SAVE_FILTERS]: WarningCode.missingPayload,
  [MessageTypes.SAVE_SETTINGS]: WarningCode.missingPayload,
  [MessageTypes.SAVE_TIMEZONE]: WarningCode.missingPayload,
  /* chrome.local storage messages */
  [MessageTypes.GET_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.GET_TOURNAMENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_CALENDAR_EVENTS]: WarningCode.emptyLocalStorage,
  [MessageTypes.SAVE_TOURNAMENTS]: WarningCode.emptyLocalStorage,
  /* Google Calander API messages */
  [MessageTypes.LIST_CALENDARS]: WarningCode.googleCalendar,
  [MessageTypes.FETCH_CALENDAR_EVENTS]: WarningCode.googleCalendar,
  [MessageTypes.CREATE_EVENT]: WarningCode.googleCalendar,
} as const;
