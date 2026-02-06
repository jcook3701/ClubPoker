/*!
 * saveCalendarEventsListener.ts for ClubPoker Chrome Extension
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
import { onMessage, sendMessage } from "@/services/messageService";
import { setLocalStorageItem } from "@/services/storageService";
import { createWarning } from "@/utils/messages/warnings";

/*
 * Saves CalendarEvents object to chrome.local storage.
 */
const saveCalendarEventsListener = (): void => {
  const messageType = MessageTypes.SAVE_CALENDAR_EVENTS;
  const warningCode = WarningCodeMap.SAVE_CALENDAR_EVENTS;
  const storageKey = StorageMap.SAVE_CALENDAR_EVENTS;

  onMessage(messageType, async (payload) => {
    const newCalendarEvents = payload.calendarData;

    if (!newCalendarEvents) {
      sendMessage(MessageTypes.WARNING, {
        warning: createWarning(warningCode, messageType),
      });
      const failResponse: ResponseMap[typeof messageType] = {
        success: false,
      };
      return failResponse;
    } else {
      await setLocalStorageItem(storageKey, newCalendarEvents);
      const successResponse: ResponseMap[typeof messageType] = {
        success: true,
      };
      return successResponse;
    }
  });
};

export default saveCalendarEventsListener;
