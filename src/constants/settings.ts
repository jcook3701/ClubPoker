/*!
 * settings.ts for ClubPoker Chrome Extension
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

import { AppSettings, Club } from "@types";

/*
 * Light and Dark mode theme options
 */
export enum ThemeMode {
  lightMode,
  darkMode,
}

/*
 * Map of available poker clubs that this application serves
 */
export const ClubTypes = {
  clubWpt: "Club_WPT",
} as const;

/*
 * Convert to a list of values
 */
export const ClubTypeValues: Club[] = Object.values(ClubTypes).map((club) => {
  return {
    value: club,
    label: club.replace("_", " "),
  };
});

const DEFAULT_THEME = ThemeMode.lightMode;
const DEFAULT_CLUB: Club = ClubTypeValues[0];

/*
 * Default Settings object
 */
export const DEFAULT_SETTINGS: AppSettings = {
  theme: DEFAULT_THEME,
  club: DEFAULT_CLUB,
};

/*
 * Converts Theme enumeration to boolean
 */
export const themeToBool = (theme: ThemeMode | undefined): boolean =>
  theme === ThemeMode.darkMode;

/*
 * Converts boolean to Theme enumeration
 */
export const boolToTheme = (checked: boolean | undefined): ThemeMode =>
  checked ? ThemeMode.darkMode : ThemeMode.lightMode;
