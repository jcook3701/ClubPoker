/*!
 * filterHelpers.ts for ClubPoker Chrome Extension
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

import { WptFilterMap } from "../../constants/filters";
import { FiltersState, Tournament, Tournaments } from "@types";

/*
 * Builds the default FiltersState for the very first run.
 * Ensures every filter option has an explicit boolean value.
 */
export const buildDefaultFilters = (): FiltersState => {
  return Object.values(WptFilterMap).reduce<FiltersState>((acc, group) => {
    const groupState = group.filter.reduce<Record<string, boolean>>(
      (gAcc, opt) => {
        gAcc[opt.id] = !!opt.defaultChecked; // true if defaultChecked, else false
        return gAcc;
      },
      {}
    );

    return {
      ...acc,
      [group.filterKey]: groupState,
    };
  }, {});
};

/*
 * This returns a list of filtered tournenets
 */
export const applyTournamentFilters = (
  data: Tournaments,
  filterState: FiltersState
): Tournaments => {
  const filtered = data.tournaments.filter((t: Tournament) =>
    Object.values(WptFilterMap).every((filter) => {
      if (!filter.filterFn) return true;
      const groupState = filterState[filter.filterKey] || {};
      return filter.filterFn(t, groupState);
    })
  );

  return {
    ...data,
    tournaments: filtered,
  };
};
