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

/*
 * clubWpt app settings
 */
export interface AppSettings {
  theme?: ThemeMode;
  club?: Club;
}

/*
 * Light and Dark mode theme options
 */
export enum ThemeMode {
  lightMode,
  darkMode,
}

/*
 * Map of avaliable poker clubs that this application serves
 */
export const ClubTypes = {
  clubWpt: "Club_WPT",
} as const;

export type ClubType = (typeof ClubTypes)[keyof typeof ClubTypes];

/*
 * Club value label pair for Autocomplete objects
 */
export interface Club {
  value: string;
  label: string;
}

/*
 * Convert to a list of values
 */
export const ClubTypeValues: Club[] = Object.values(ClubTypes).map((club) => {
  return {
    value: club,
    label: club.replace("_", " "),
  };
});

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
