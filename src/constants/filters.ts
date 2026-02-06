/*!
 * filters.ts for ClubPoker Chrome Extension
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

import { Filter, FilterState } from "@types";
import styles from "@/components/filters/Filters.module.scss";
import { FILTER_KEYS } from "@/config/chrome";

/*
 * Buy-In Filter Constants
 */
const BUYINFILTER: Filter = {
  title: "Buy-In Filter:",
  filterKey: FILTER_KEYS.buyInFilter,
  filter: [
    { id: "FREEROLE", label: "FREEROLE" },
    { id: "50 TP", label: "50 TP" },
    { id: "75 TP", label: "75 TP" },
    { id: "250 TP", label: "250 TP" },
    { id: "400 TP", label: "400 TP", defaultChecked: true },
    { id: "500 TP", label: "500 TP", defaultChecked: true },
    { id: "1,000 TP", label: "1000 TP", defaultChecked: true },
    { id: "2,000 TP", label: "2000 TP", defaultChecked: true },
  ],
  filterFn: (tournament, values: FilterState) => {
    const key = tournament.buyin;
    return values[key] === true; // unspecified or false -> filter out
  },
  className: styles.buyInFilter,
};

/*
 * Game Filter Constants
 */
const GAMEFILTER: Filter = {
  title: "Game Filter:",
  filterKey: FILTER_KEYS.gameFilter,
  filter: [
    { id: "PL OMAHAHL", label: "PL OmahaHL" },
    { id: "PL OMAHA", label: "PL Omaha" },
    { id: "NL HOLDEM", label: "NL Holdem", defaultChecked: true },
    { id: "PL HOLDEM", label: "PL Holdem" },
    { id: "FL HOLDEM", label: "FL Holdem" },
  ],
  filterFn: (tournament, values: FilterState) => {
    const key = tournament.game;
    return values[key] === true; // unspecified or false -> filter out
  },
  className: styles.gameFilter,
};

/*
 * All filters for club wpt tournaments object
 */
export const WptFilterMap = {
  [FILTER_KEYS.gameFilter]: GAMEFILTER,
  [FILTER_KEYS.buyInFilter]: BUYINFILTER,
};
