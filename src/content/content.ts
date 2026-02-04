/*!
 * content.ts for ClubPoker Chrome Extension
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

import observeTournamentData from "../utils/observers/observeTournamentData";
import { registerContentListeners } from "../listeners";
import { sendMessage } from "../services/messageService";
import { MessageTypes } from "../constants/messages";
import { clubwptDomUpdater } from "./dom/TournamentsDataUpdater/TournamentDataUpdater";
import { tournamentsToCalendarEvents } from "../services/googleCalendarService";
import { applyTournamentFilters } from "../utils/filter/filterHelpers";

console.log("lobby.clubwpt.com Content Script Started:");
(async () => {
  try {
    await sendMessage(MessageTypes.PAGE_RELOADED);
  } catch (err) {
    console.warn("PAGE_RELOADED message failed:", err);
  }
})();

observeTournamentData(async (data) => {
  const saved = await sendMessage(MessageTypes.GET_TOURNAMENTS);
  const tournaments = saved.tournamentData;

  if (!tournaments) {
    await sendMessage(MessageTypes.SAVE_TOURNAMENTS, { tournamentData: data });
  }

  const adjusted = await clubwptDomUpdater(data);

  if (adjusted) {
    const getFiltersResponse = await sendMessage(MessageTypes.GET_FILTERS);
    const filtersState = getFiltersResponse.filters;

    // TODO: Reverse order of filtered tournaments for display purposes
    const filteredTournaments = applyTournamentFilters(adjusted, filtersState);

    const calendarEvents = tournamentsToCalendarEvents(filteredTournaments);

    await sendMessage(MessageTypes.SAVE_CALENDAR_EVENTS, {
      calendarData: calendarEvents,
    });
  }
});

registerContentListeners();
