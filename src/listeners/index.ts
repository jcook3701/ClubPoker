/*!
 * listeners/index.ts for ClubPoker Chrome Extension
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

import getTournamentsListener from "./getTournamentsListener";
import getCalendarListener from "./getCalendarListener";
import saveSettingsListener from "./saveSettingsListener";
import saveTimezoneListener from "./saveTimezoneListener";
import saveTournamentsListener from "./saveTournamentsListener";
import pageReloadListener from "./pageReloadListener";
import getCalendarEventsListener from "./getCalendarEventsListener";
import saveCalendarListener from "./saveCalendarListener";
import saveCalendarEventsListener from "./saveCalendarEventsListener";
import getSettingsListener from "./getSettingsListener";
import getFiltersListener from "./getFiltersListener";
import getTimezoneListener from "./getTimezoneListener";
import saveFiltersListener from "./saveFiltersListener";
import timezoneChangeListener from "./timezoneChangeListener";
import errorListener from "./errorListener";
import warningListener from "./warningListener";
import settingsChangeListener from "./settingsChangeListener";
import createEventsListener from "./createEventListener";
import listCalendarsListener from "./listCalendarsListener";
import fetchCalendarEventsListener from "./fetchCalendarEventsListener";

/*
 * Listeners to register in the context script.
 */
export const registerContentListeners = (): void => {
  console.log("register context Listeners");
  /* event listeners */
  timezoneChangeListener();
  // settingsChangeListener(); TODO:
};

/*
 * Listeners to register in the background script.
 */
export const registerBackgroundListeners = (): void => {
  console.log("register background Listeners");
  /* event listeners */
  pageReloadListener();
  errorListener();
  warningListener();

  /* chrome.sync storage listeners */
  // getters
  getCalendarListener();
  getFiltersListener();
  getSettingsListener();
  getTimezoneListener();
  // setters
  saveCalendarListener();
  saveFiltersListener();
  saveSettingsListener();
  saveTimezoneListener();

  /* chrome.local storage listeners */
  // getters
  getCalendarEventsListener();
  getTournamentsListener();
  // setters
  saveCalendarEventsListener();
  saveTournamentsListener();

  /* Google Calander API listeners */
  listCalendarsListener();
  fetchCalendarEventsListener();
  createEventsListener();
};
