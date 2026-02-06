/*!
 * tournamentUtils.ts for ClubPoker Chrome Extension
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

import { Tournament } from "@types";

export const extractTournamentData = (row: Element): Tournament => {
  console.log("ExtractTournamentData");
  const columns = row.querySelectorAll("ion-col");
  console.log("ion-col: ", columns);
  const start = columns[1]?.textContent?.trim() || "";
  const game = columns[2]?.textContent?.trim() || "";
  const buyin = columns[3]?.textContent?.trim() || "";
  const name = columns[4]?.textContent?.trim() || "";
  const id = columns[5]?.textContent?.trim() || "";
  const status = columns[6]?.textContent?.trim() || "";
  const enrolled = Number(columns[7]?.textContent?.trim() || "0");
  const startTime = start;

  return { start: startTime, game, buyin, name, id, status, enrolled };
};

export const scrapeTournaments = (): Tournament[] => {
  const rows = document.querySelectorAll(".grid-rows.row");
  const ionrows = document.getElementsByTagName("grid-poker");
  console.log("scrapeTournaments");
  console.log("document: ", document);

  console.log("scrapeTournaments rows:", rows);
  console.log("scrapeTournaments ionrows:", ionrows);
  return Array.from(rows)
    .map((row) => extractTournamentData(row))
    .filter(
      (tournament) =>
        tournament.start &&
        tournament.game &&
        tournament.buyin &&
        tournament.name &&
        tournament.id &&
        tournament.status &&
        tournament.enrolled
    );
};
