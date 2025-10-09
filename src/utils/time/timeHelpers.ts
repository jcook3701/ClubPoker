import { parse, parseISO } from "date-fns";
import { fromZonedTime, toZonedTime, toDate, format } from "date-fns-tz";
import { Timezone, Tournaments } from "@types";
import { DateTime } from "luxon";

/*
 * Time Formats
 */
const offficalTimeFormat = "h: mm a ZZZZ";
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
 * Time Formaters use by GUI
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
 * @returns string formated as UTC ISO date
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
 * Convert startimes within tournaments object to new timezone
 * @param dateTime
 * @param endTimeZone
 * @returns string formated as UTC ISO date
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
 * TODO: Convert WPT Offical time of format "h:mm a z" to user specified timezone.
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
  const formated = zoned.toFormat(offficalTimeFormat);
  console.log("zoned: ", formated);
  return formated;
};
