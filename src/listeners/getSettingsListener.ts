/*!
 * getSettingsListener.ts for ClubPoker Chrome Extension
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
import { DEFAULT_SETTINGS } from "@/constants/settings";
import { WarningCodeMap } from "@/constants/warnings";
import { onMessage, sendMessage } from "@/services/messageService";
import { getSyncStorageItem } from "@/services/storageService";
import { AppSettings } from "@types";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Returns Settings object from chrome.sync storage or
 * default settings object from constants.
 */
const getSettingsListener = (): void => {
  const messageType = MessageTypes.GET_SETTINGS;
  const warningCode = WarningCodeMap.GET_SETTINGS;
  const storageKey = StorageMap.GET_SETTINGS;
  onMessage(messageType, async () => {
    const settings = await getSyncStorageItem<AppSettings>(storageKey);
    if (!settings) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
    }
    const resolvedSettings = settings ?? DEFAULT_SETTINGS;
    // console.log("resolvedSettings: ", resolvedSettings);
    const response: ResponseMap[typeof messageType] = {
      success: true,
      settings: resolvedSettings,
    };
    return response;
  });
};

export default getSettingsListener;
