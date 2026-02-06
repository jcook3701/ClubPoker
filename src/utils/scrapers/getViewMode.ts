/*!
 * getViewMode.ts for ClubPoker Chrome Extension
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
  DomToggleGridIcon,
  DomToggleListIcon,
  DomToggleSwitch,
  DomToggleView,
} from "@/constants/tournaments";
import { ViewMode } from "@types";

/*
 * Used to tell if lobby.clubwpt.com dom is in row or column mode.
 */
const getViewMode = (): ViewMode => {
  const toggle = document.querySelector(DomToggleView);
  if (!toggle) {
    console.warn("No toggle-view found");
    return { isGrid: false, isRow: false };
  }

  // Find icons inside toggle
  const listIcon = toggle.querySelector(DomToggleListIcon);
  const gridIcon = toggle.querySelector(DomToggleGridIcon);

  if (!listIcon || !gridIcon) {
    console.warn("Icons not found inside toggle-view");
    return { isGrid: false, isRow: false };
  }

  // The active icon has the "toggle-hover" class
  const isGrid = gridIcon.classList.contains(DomToggleSwitch);
  const isRow = listIcon.classList.contains(DomToggleSwitch);

  return { isGrid, isRow };
};

export default getViewMode;
