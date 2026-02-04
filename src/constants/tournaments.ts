/*!
 * tournaments.ts for ClubPoker Chrome Extension
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

export const DomTournamentGrid = "tournaments-grid";
export const DomRowItem = "ion-col.col";
export const DomColItem = "span.tiles-text";

export const DomViewMode = {
  rowView: "ion-row.grid-rows.row",
  colView: "ion-col.nested-col.col",
} as const;

export const DomToggleView = "toggle-view";
export const DomToggleListIcon = 'ion-icon[name="list"]';
export const DomToggleGridIcon = 'ion-icon[name="grid"]';
export const DomToggleSwitch = "toggle-hover";
