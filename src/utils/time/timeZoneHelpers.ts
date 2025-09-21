import { parse } from "date-fns";
import { fromZonedTime, toZonedTime, toDate, format } from "date-fns-tz";
import Timezone from "../../types/Timezone";
import { Tournaments } from "../../types/tournament";
import { DateTime } from "luxon";

/*
 * Convert WPT Offical time of format "h:mm a z" to user specified timezone.
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
  const formated = zoned.toFormat("h:mm a ZZZZ");
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
  const parsed = parse(dateTime, "MMM d h:mm a", new Date());
  const utcDate = fromZonedTime(parsed, startTimeZone.value);
  const zoned = toZonedTime(utcDate, endTimeZone.value);
  return format(zoned, "MMM d h:mm a");
};

/*
 * Convert startimes within tournaments object to new timezone
 */
export const convertTournamentTimes = (
  tournamentData: Tournaments,
  timeZone: Timezone
): Tournaments => {
  return {
    timeZone: timeZone,
    tournaments: tournamentData.tournaments.map((t) => ({
      ...t,
      start: convertToTimeZone(t.start, tournamentData.timeZone, timeZone),
    })),
  };
};
