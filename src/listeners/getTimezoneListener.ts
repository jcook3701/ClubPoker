/*!
 * getTimezoneListener.ts for ClubPoker Chrome Extension
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
import { DEFAULT_TIMEZONE } from "../constants/timezone";
import { WarningCodeMap } from "../constants/warnings";
import { onMessage, sendMessage } from "../services/messageService";
import { getSyncStorageItem } from "../services/storageService";
import { Timezone } from "@types";
import { createWarning } from "../utils/messages/warnings";

/*
 * Returns Timezone object from chrome.sync storage or
 * default timezone object from constants.
 */
const getTimezoneListener = (): void => {
  const messageType = MessageTypes.GET_TIMEZONE;
  const warningCode = WarningCodeMap.GET_TIMEZONE;
  const storageKey = StorageMap.GET_TIMEZONE;
  onMessage(messageType, async () => {
    const timezone = await getSyncStorageItem<Timezone>(storageKey);
    if (!timezone) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }
    const resolvedTimezone = timezone ?? DEFAULT_TIMEZONE;
    // console.log("Get Timezone: ", resolvedTimezone);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      timezone: resolvedTimezone,
    };
    return response;
  });
};

export default getTimezoneListener;
