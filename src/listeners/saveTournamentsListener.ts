/*!
 * saveTournamentsListener.ts for ClubPoker Chrome Extension
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

import { StorageMap } from "../constants/chromeStorage";
import { MessageTypes } from "../constants/messages";
import { ResponseMap } from "../constants/responses";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage } from "../services/messageService";
import { setLocalStorageItem } from "../services/storageService";

/*
 * Saves Tournaments object payload to chrome.local storage.
 */
const saveTournamentsListener = (): void => {
  const messageType = MessageTypes.SAVE_TOURNAMENTS;
  const _warningCode = WarningCodeMap.SAVE_TOURNAMENTS;
  const storageKey = StorageMap.SAVE_TOURNAMENTS;
  onMessage(messageType, async (payload) => {
    const newTournaments = payload.tournamentData;
    await setLocalStorageItem(storageKey, newTournaments);
    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default saveTournamentsListener;
