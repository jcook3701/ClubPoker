/*!
 * observeTournamentData.ts for ClubPoker Chrome Extension
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

import { LOCAL_STORAGE_KEYS } from "../../config/chrome";
import { MessageTypes } from "../../constants/messages";
import { DEFAULT_TIMEZONE } from "../../constants/timezone";
import { DomToggleView, DomTournamentGrid } from "../../constants/tournaments";
import { sendMessage } from "../../services/messageService";
import { getLocalStorageItem } from "../../services/storageService";
import { Tournaments } from "@types";
import getTournamentsFromDom from "../scrapers/getTournamentData";

/*
 * Utility: debounce function calls.
 * Ensures `fn` only executes after `delay` ms of silence.
 * Useful for preventing excessive calls from noisy observers.
 */
const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
): ((...args: Args) => void) => {
  let timer: number | undefined;
  return (...args: Args) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => fn(...args), delay);
  };
};

/*
 * Waits for the <tournaments-grid> element to appear in the DOM.
 * Immediately calls `callback` if it's already present,
 * otherwise attaches a temporary MutationObserver on <body>
 * and disconnects once the grid is found.
 */
const waitForTournamentGrid = (callback: (grid: Element) => void): void => {
  const container = document.querySelector(DomTournamentGrid);
  if (container) {
    callback(container);
    return;
  }

  const tempObserver = new MutationObserver(() => {
    const container = document.querySelector(DomTournamentGrid);
    if (container) {
      callback(container);
      tempObserver.disconnect(); // stop watching <body>
    }
  });

  tempObserver.observe(document.body, { childList: true, subtree: true });
};

/*
 * Observes tournament data inside <tournaments-grid>.
 * 1. Collects tournament info from the DOM.
 * 2. Falls back to stored timezone if available.
 * 3. Debounces observer callbacks to avoid rapid firing.
 */
const observeTournamentData = (callback: (data: Tournaments) => void): void => {
  waitForTournamentGrid(() => {
    const run = (): void => {
      getLocalStorageItem<Tournaments>(LOCAL_STORAGE_KEYS.tournaments).then(
        (storageTournaments) => {
          const timezone = storageTournaments
            ? storageTournaments?.timeZone
            : DEFAULT_TIMEZONE;

          const domTournaments: Tournaments = getTournamentsFromDom(timezone);

          if (domTournaments.tournaments.length > 0) {
            callback(domTournaments);
          }
        }
      );
    };

    // Debounced runner
    const debouncedRun = debounce(run, 300);

    const attachGridObserver = () => {
      waitForTournamentGrid((container) => {
        const observer = new MutationObserver(debouncedRun);
        observer.observe(container, { childList: true, subtree: true });
        debouncedRun(); // Run immediately once
      });
    };

    // Initial attach
    attachGridObserver();

    // Watch for view mode changes — reattach observer when toggled
    const toggle = document.querySelector(DomToggleView);
    if (toggle) {
      const modeObserver = new MutationObserver(async () => {
        await sendMessage(MessageTypes.PAGE_RELOADED);
        attachGridObserver();
      });

      modeObserver.observe(toggle, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class"],
      });
    }
  });
};

export default observeTournamentData;
