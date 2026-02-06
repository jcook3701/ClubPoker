/*!
 * pageReloadListener.ts for ClubPoker Chrome Extension
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

import { LOCAL_STORAGE_KEYS } from "@/config/chrome";
import { MessageTypes } from "@/constants/messages";
import { ResponseMap } from "@/constants/responses";
import { onMessage } from "@/services/messageService";
import { removeLocalStorageItem } from "@/services/storageService";

/*
 * On page reload clear tournaments from Local Storage.
 */
const pageReloadListener = (): void => {
  const messageType = MessageTypes.PAGE_RELOADED;

  onMessage(messageType, async () => {
    await removeLocalStorageItem(LOCAL_STORAGE_KEYS.tournaments);
    await removeLocalStorageItem(LOCAL_STORAGE_KEYS.calendarEvents);

    const response: ResponseMap[typeof messageType] = {
      success: true,
    };
    return response;
  });
};

export default pageReloadListener;
