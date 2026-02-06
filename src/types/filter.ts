/*!
 * filter.ts for ClubPoker Chrome Extension
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

import { Tournament } from "./tournament";

/*
 * Filter state of all filters
 */
export type FiltersState = Record<string, FilterState>;

/*
 * Filter state of individual filter
 */
export type FilterState = Record<string, boolean>;

/*
 *
 */
export interface Filter {
  title: string;
  filterKey: string;
  filter: FilterItem[];
  filterFn: (tournament: Tournament, values: FilterState) => boolean;
  className?: string;
}

/*
 * Individual Filter Item.
 */
export interface FilterItem {
  id: string;
  label: string;
  defaultChecked?: boolean;
}
