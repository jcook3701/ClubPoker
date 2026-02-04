/*!
 * getTournamentData.ts for ClubPoker Chrome Extension
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
  DomColItem,
  DomRowItem,
  DomTournamentGrid,
  DomViewMode,
} from "../../constants/tournaments";
import { Timezone, Tournament, Tournaments } from "@types";
import { toUtcIso } from "../time/timeHelpers";
import getViewMode from "./getViewMode";

/*
 * Exports tournament data when in lobby.clubwpt.com is in row mode.
 */
const rowExport = (sourceTimeZone: Timezone, rows: Element[]): Tournament[] => {
  return rows
    .map((row) => {
      const cols = Array.from(row.querySelectorAll(DomRowItem));
      if (cols.length < 8) return null; // skip invalid cols

      return {
        start: toUtcIso(sourceTimeZone, cols[1].textContent?.trim()),
        game: cols[2].textContent?.trim() || "",
        buyin: cols[3].textContent?.trim() || "",
        name: cols[4].textContent?.trim() || "",
        id: cols[5].textContent?.trim() || "",
        status: cols[6].textContent?.trim() || "",
        enrolled: Number(cols[7].textContent?.trim() || "0"),
      } as Tournament;
    })
    .filter((tournament): tournament is Tournament => tournament !== null);
};

/*
 * Exports tournament data when in lobby.clubwpt.com is in col mode.
 */
const colExport = (sourceTimeZone: Timezone, cols: Element[]): Tournament[] => {
  return cols
    .map((col) => {
      const row = Array.from(col.querySelectorAll(DomColItem));
      if (row.length < 7) return null; // skip invalid rows

      return {
        start: toUtcIso(sourceTimeZone, row[0].textContent?.trim()),
        game: row[1].textContent?.trim() || "",
        buyin: row[2].textContent?.trim() || "",
        name: row[3].textContent?.trim() || "",
        id: row[4].textContent?.trim() || "",
        status: row[5].textContent?.trim() || "",
        enrolled: Number(row[6].textContent?.trim() || "0"),
      } as Tournament;
    })
    .filter((tournament): tournament is Tournament => tournament !== null);
};

/*
 * Collects current selector mode from the loby.clubwpt.com dom.
 */
export const getSelectorModeFromDom = (): string => {
  const viewMode = getViewMode();
  return viewMode.isRow ? DomViewMode.rowView : DomViewMode.colView;
};

/*
 * Collects tournament data from the loby.clubwpt.com dom.
 */
const getTournamentsFromDom = (sourceTimeZone: Timezone): Tournaments => {
  const viewMode = getViewMode();
  const selector = getSelectorModeFromDom();
  const container = document.querySelector(DomTournamentGrid);
  const data = container
    ? Array.from(container.querySelectorAll(selector))
    : [];

  const scrapedTournaments = viewMode.isRow
    ? rowExport(sourceTimeZone, data)
    : colExport(sourceTimeZone, data);

  const tournamentsData: Tournaments = {
    timeZone: sourceTimeZone,
    tournaments: scrapedTournaments,
    domViewMode: viewMode,
    timestamp: new Date(),
  };
  return tournamentsData;
};

export default getTournamentsFromDom;
