import { parse, parseISO } from "date-fns";
import { fromZonedTime, toZonedTime, toDate, format } from "date-fns-tz";
import Timezone from "../../types/Timezone";
import { Tournaments } from "../../types/tournament";
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

export const normalizeDateTime = (dateTime?: string): string =>
  dateTime ? new Date(dateTime).toISOString() : "";

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

/*
 * Convert WPT tournament start times of format "MMM d h:mm a" to user specified timezone.
 */
export const convertToTimeZone = (
  dateTime: string,
  startTimeZone: Timezone,
  endTimeZone: Timezone
): string => {
  const parsed = parse(dateTime, tournamentTimeFormat, new Date());
  const currentYear = new Date().getFullYear();
  parsed.setFullYear(currentYear);
  const utcDate = fromZonedTime(parsed, startTimeZone.value);
  const zoned = toZonedTime(utcDate, endTimeZone.value);
  return format(zoned, tournamentTimeFormat);
};

/*
 * Convert startimes within tournaments object to new timezone
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
      start: convertToTimeZone(t.start, tournamentData.timeZone, newTimeZone),
    })),
  };
};

/*
 * Date  formated for Month Day, Year Hour:Min AM/PM
 */
export const formatDateHumanReadable = (date: string | undefined): string => {
  if (date) {
    return format(parseISO(date), calendarTimeFormat);
  }
  return "";
};
