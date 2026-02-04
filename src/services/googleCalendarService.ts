/*!
 * googleCalendarService.ts for ClubPoker Chrome Extension
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
  CalendarEvent,
  CalendarEvents,
  Timezone,
  Tournament,
  Tournaments,
} from "@types";

/*
 * Create a Google Calendar event object from lobby.clubwpt.com
 * tournament object.
 *
 * @param tournament
 * @param timeZone
 * @returns CalendarEvent
 */
export const tournamentToCalendarEvent = (
  tournament: Tournament,
  timeZone: Timezone
): CalendarEvent => {
  const startDateTime = new Date(tournament.start);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event: CalendarEvent = {
    summary: tournament.name,
    description: `${tournament.game} - ${tournament.buyin}`,
    start: {
      dateTime: tournament.start,
      timeZone: timeZone.value,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: timeZone.value,
    },
    reminders: {
      // TODO: Maybe make this something the user can set.
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 10 }, // notification 10 min before
      ],
    },
  };

  return event;
};

/*
 * Converts tournaments object into calendarEvents object.
 * @param tournaments
 * @returns CalendarEvents
 */
export const tournamentsToCalendarEvents = (
  tournaments: Tournaments
): CalendarEvents => {
  const calendarEvents: CalendarEvents = {
    calendarEvents: tournaments.tournaments.map((tournament) => {
      return tournamentToCalendarEvent(tournament, tournaments.timeZone);
    }),
    timestamp: tournaments.timestamp,
  };
  return calendarEvents;
};

const googleCalendarService = {
  tournamentToCalendarEvent,
  tournamentsToCalendarEvents,
};

export default googleCalendarService;
