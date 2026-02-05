/*!
 * timeHelpers.ts for ClubPoker Chrome Extension
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

import { parse, parseISO } from "date-fns";
import { fromZonedTime, toZonedTime, format } from "date-fns-tz";
import { Timezone, Tournaments } from "@types";
import { DateTime } from "luxon";

/*
 * Time Formats
 */
const officialTimeFormat = "h: mm a ZZZZ";
const calendarTimeFormat = "MMM d, yyyy h:mm a";
const tournamentTimeFormat = "MMM d h:mm a";

/*
 * Time parsers
 */
export const parseCalendarTime = (dateTime: string): Date =>
  parse(dateTime, calendarTimeFormat, new Date());

export const parseTournamentTime = (dateTime: string): Date =>
  parse(dateTime, tournamentTimeFormat, new Date());

/*
 * Time Formatters use by GUI
 */
export const formatCalendarTime = (date: string | undefined): string =>
  date ? format(parseISO(date), calendarTimeFormat) : "";

export const formatTournamentTime = (date: string | undefined): string =>
  date ? format(parseISO(date), tournamentTimeFormat) : "";

/*
 * Used to normalize fix dateTime from google API
 */
export const normalizeDateTime = (dateTime?: string): string =>
  dateTime ? new Date(dateTime).toISOString() : "";

/**
 * Convert a local datetime string in a known timezone into a UTC ISO string.
 * @param sourceTimeZone
 * @param dataTime
 * @returns string formatted as UTC ISO date
 */
export const toUtcIso = (
  sourceTimeZone: Timezone,
  dateTime?: string
): string => {
  if (!dateTime) return "";

  // Parse the string into a Date object (no timezone info yet)
  const parsed = parse(dateTime, tournamentTimeFormat, new Date());

  // Ensure current year is set (otherwise parse() may default to 2001)
  parsed.setFullYear(new Date().getFullYear());

  // Convert the parsed "wall clock" time in the given timezone → UTC Date
  const utcDate = fromZonedTime(parsed, sourceTimeZone.value);

  // Return in ISO 8601 UTC form
  return utcDate.toISOString(); // always ends with "Z"
};

/*
 * Convert start times within tournaments object to new timezone
 * @param dateTime
 * @param endTimeZone
 * @returns string formatted as UTC ISO date
 */
export const convertTournamentTimes = (
  tournamentData: Tournaments,
  newTimeZone: Timezone
): Tournaments => {
  return {
    ...tournamentData,
    timeZone: newTimeZone,
    tournaments: tournamentData.tournaments.map((t) => ({
      ...t,
      start: toZonedTime(t.start, newTimeZone.value).toISOString(),
    })),
  };
};

/*
 * TODO: Convert WPT Official time of format "h:mm a z" to user specified timezone.
 */
export const convertFromTzAbbrToUser = (
  dateTime: string, // e.g., "6:09 AM EST"
  timezone: Timezone // e.g., "America/Los_Angeles"
): string => {
  const [timeStr, timeMer, tzAbbr] = dateTime.split(" ");
  const testTime = `${timeStr} ${timeMer}`;
  console.log("time: ", timeStr, "timezone: ", tzAbbr);
  // parse the time together with the tzAbbr
  console.log(testTime);
  const parsed = DateTime.fromFormat(testTime, "h:mm a").setZone(
    "America/New_York",
    { keepLocalTime: true }
  );
  console.log("parsed: ", parsed);
  const zoned = parsed.setZone(timezone.value);
  console.log("zoned: ", zoned);
  const formatted = zoned.toFormat(officialTimeFormat);
  console.log("zoned: ", formatted);
  return formatted;
};
