/*!
 * timezoneChangeListener.ts for ClubPoker Chrome Extension
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

import { StorageMap } from "@/constants/chromeStorage";
import { MessageTypes } from "@/constants/messages";
import { ResponseMap } from "@/constants/responses";
import { WarningCodeMap } from "@/constants/warnings";
import { clubwptDomUpdater } from "@/content/dom/TournamentDataUpdater";
import { onMessage, sendMessage } from "@/services/messageService";
import { getLocalStorageItem } from "@/services/storageService";
import { Tournaments } from "@types";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Handles DOM updates when timezone is modified within chrome.sync storage.
 */
const timezoneChangeListener = (): void => {
  const messageType = MessageTypes.TIMEZONE_CHANGE;
  const warningCode = WarningCodeMap.TIMEZONE_CHANGE;
  const storageKey = StorageMap.TIMEZONE_CHANGE;
  onMessage(messageType, async () => {
    const tournaments = await getLocalStorageItem<Tournaments>(storageKey);
    if (!tournaments) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      clubwptDomUpdater(tournaments);

      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default timezoneChangeListener;
